import dotenv from 'dotenv';
import mongoose from 'mongoose';
import express from 'express';
import reservaRoutes from './src/routes/reservaRoutes.js';
import salaRoutes from './src/routes/salaRoutes.js';

dotenv.config();
const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Conectado ao MongoDB!'))
  .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

reservaRoutes(app);
salaRoutes(app);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
