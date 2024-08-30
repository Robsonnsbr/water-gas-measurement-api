import {
  GoogleGenerativeAI,
  Part,
  GenerativeContentBlob
} from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  throw new Error('API_KEY inválida ou não definida');
}

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-pro'
});

export async function handleGenerateContent(
  inlineData: GenerativeContentBlob
): Promise<any> {
  const prompt: Part = {
    text: 'Describe how this product might be manufactured.'
  };
  const result = await model.generateContent([prompt, { inlineData }]);
  return result.response.text();
}
