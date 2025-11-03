import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

import contactRoutes from './modules/contact/routes/contact.routes.js';

dotenv.config();

const app = express();
app.use(
  cors({ origin: ['https://ismaelplg.github.io'], methods: ['GET', 'POST'] }),
);
app.use(express.json());
app.use(helmet());

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: {
    error: 'Demasiadas solicitudes, inténtalo más tarde ⏳',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.get('/', (_req, res) => {
  res.status(200).json({
    status: 'OK ✅',
    message: 'Servidor funcionando 🚀',
  });
});

app.use('/api/contact', limiter, contactRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
export default app;
