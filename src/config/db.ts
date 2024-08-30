import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const mongoURI = `mongodb+srv://shopper:dQ7WTgDc2vqwOyMT@repositorygithub.nghxluq.mongodb.net/shopper?retryWrites=true&w=majority&appName=repositoryGitHub`;
const mongoUri = process.env.MONGO_URI || mongoURI;

if (!mongoUri) {
  console.error('MONGO_URI não está configurada no .env');
  process.exit(1);
}

export const connectToDatabase = async () => {
  if (mongoose.connection.readyState === 1) {
    console.log('Já conectado ao MongoDB');
    return;
  }

  try {
    await mongoose.connect(mongoUri);
    console.log('Conectado ao MongoDB');
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error);
    process.exit(1);
  }
};
