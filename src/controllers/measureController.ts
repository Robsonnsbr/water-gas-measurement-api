import { Request, Response } from 'express';
import { Measure } from '../models/measureModel';
import { v4 as uuidv4 } from 'uuid';
import { validateInput } from '../utils/validators';
import GeminiService from '../services/classGeminiService';

//TODO: corrigir fn uploadImage
export const uploadImage = async (req: Request, res: Response) => {
  const { inlineData, customer_code, measure_datetime, measure_type } =
    req.body;
  if (!validateInput(req.body)) {
    return res.status(400).json({
      error_code: 'INVALID_DATA',
      error_description: 'Dados inválidos.'
    });
  }

  try {
    const existingMeasure = await Measure.findOne({
      customer_code,
      measure_type,
      measure_datetime: {
        $gte: new Date(measure_datetime).setDate(1),
        $lt: new Date(measure_datetime).setMonth(
          new Date(measure_datetime).getMonth() + 1
        )
      }
    });

    if (existingMeasure) {
      return res.status(409).json({
        error_code: 'DOUBLE_REPORT',
        error_description: 'Leitura do mês já realizada'
      });
    }

    const measure_value = await GeminiService.extractData(inlineData);
    const measure_uuid = uuidv4();

    const image_url = `http://localhost:3000/images/${measure_uuid}`;

    const newMeasure = new Measure({
      customer_code,
      measure_datetime,
      measure_type,
      measure_value,
      measure_uuid,
      image_url
    });
    await newMeasure.save();
    res.status(200).json({ image_url, measure_value, measure_uuid });
  } catch (error) {
    console.error('Erro ao processar a imagem:', error);
    res.status(500).json({
      error_code: 'PROCESSING_ERROR',
      error_description: 'Ocorreu um erro ao processar a imagem.'
    });
  }
};

export const confirmMeasure = async (req: Request, res: Response) => {
  const { measure_uuid, confirmed_value } = req.body;

  const measure = await Measure.findOne({ measure_uuid });

  if (!measure) {
    return res.status(404).json({
      error_code: 'MEASURE_NOT_FOUND',
      error_description: 'Leitura não encontrada'
    });
  }

  if (measure.has_confirmed) {
    return res.status(409).json({
      error_code: 'CONFIRMATION_DUPLICATE',
      error_description: 'Leitura já confirmada'
    });
  }

  measure.measure_value = confirmed_value;
  measure.has_confirmed = true;
  await measure.save();

  res.status(200).json({ success: true });
};

export const listMeasures = async (req: Request, res: Response) => {
  const { customer_code } = req.params;
  const { measure_type } = req.query;

  const filter: any = { customer_code };
  if (measure_type) {
    filter.measure_type = measure_type.toString().toUpperCase();
  }

  const measures = await Measure.find(filter);

  if (measures.length === 0) {
    return res.status(404).json({
      error_code: 'MEASURES_NOT_FOUND',
      error_description: 'Nenhuma leitura encontrada'
    });
  }

  res.status(200).json({ customer_code, measures });
};
