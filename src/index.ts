import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import contactRoutes from './modules/contact/routes/contact.routes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/contact', contactRoutes);

export default app;
