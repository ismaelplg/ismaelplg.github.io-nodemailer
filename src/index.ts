import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import contactRoutes from './modules/contact/routes/contact.routes';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/contact', contactRoutes);

const PORT = process.env.PORT || 3000;

console.log(process.env.SMTP_USER);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
