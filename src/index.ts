import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import contactRoutes from './modules/contact/routes/contact.routes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => {
  res.status(200).json({
    status: 'OK ✅',
    message: 'Servidor funcionando 🚀',
  });
});

app.use('/api/contact', contactRoutes);

export default app;
