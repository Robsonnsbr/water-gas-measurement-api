import {
  GoogleGenerativeAI,
  Part,
  GenerativeContentBlob,
  GenerativeModel
} from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

class GeminiService {
  private static model: GenerativeModel | null = null;

  private static async initializeModel(): Promise<void> {
    if (GeminiService.model) return;

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('API_KEY inválida ou não definida');
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    GeminiService.model = genAI.getGenerativeModel({
      model: 'gemini-1.5-pro'
    });
  }

  public static async extractData(
    inlineData: GenerativeContentBlob
  ): Promise<string> {
    await GeminiService.initializeModel();

    const prompt: Part = {
      text: 'Extraia os seguintes dados da conta de energia ou conta de água: consumo total, valor total, data de vencimento, código do cliente.'
    };

    const { response } = await GeminiService.model!.generateContent([
      prompt,
      { inlineData }
    ]);

    return response.text();
  }
}

export default GeminiService;
