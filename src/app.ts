import express from 'express';
import measureRoutes from './routes/measureRoutes';
import dotenv from 'dotenv';
import { connectToDatabase } from './config/db';
const bodyParser = require('body-parser');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(bodyParser.json({ limit: '10mb' }));
const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type,Authorization'
};
app.use(cors(corsOptions));
app.use(express.json());
app.use('/api', measureRoutes);

connectToDatabase();

export default app;
