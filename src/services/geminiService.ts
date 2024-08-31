// import {
//   GoogleGenerativeAI,
//   Part,
//   GenerativeContentBlob
// } from '@google/generative-ai';
// import dotenv from 'dotenv';

// dotenv.config();

// const apiKey = process.env.GEMINI_API_KEY;
// if (!apiKey) {
//   throw new Error('API_KEY inválida ou não definida');
// }

// const genAI = new GoogleGenerativeAI(apiKey);

// const model = genAI.getGenerativeModel({
//   model: 'gemini-1.5-pro'
// });

// export async function handleGenerateContent(
//   inlineData: GenerativeContentBlob
// ): Promise<any> {
//   const prompt: Part = {
//     text: 'Extraia os seguintes dados da conta de energia ou conta de água: consumo total, valor total, data de vencimento, código do cliente.'
//   };
//   const { response } = await model.generateContent([prompt, { inlineData }]);
//   console.log(response);
//   return response.text();
// }

import {
  GoogleGenerativeAI,
  Part,
  GenerativeContentBlob
} from '@google/generative-ai';

export class GeminiConnection {
  private model: any;

  async connect(): Promise<void> {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('API_KEY inválida ou não definida');
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    this.model = await genAI.getGenerativeModel({
      model: 'gemini-1.5-pro'
    });
  }

  async extractData(inlineData: GenerativeContentBlob): Promise<string> {
    if (!this.model) {
      throw new Error('Conexão não estabelecida');
    }

    const prompt: Part = {
      text: 'Extraia os seguintes dados da conta de energia ou conta de água: consumo total, valor total, data de vencimento, código do cliente.'
    };
    const { response } = await this.model.generateContent([
      prompt,
      { inlineData }
    ]);
    return response.text();
  }

  async disconnect(): Promise<void> {
    this.model = null;
    console.log('desconectado do gemini');
  }
}
