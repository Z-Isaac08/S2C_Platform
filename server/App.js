import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import apiRoutes from './src/routes/api.js';

const app = express();
const PORT = process.env.PORT || 5000;

// 1. Sécurité Globale (Zero Trust)
app.use(helmet()); // En-têtes sécurisés
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173', // Restriction d'origine
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// 2. Middlewares de base
app.use(express.json()); // Parsing JSON
app.use(express.urlencoded({ extended: true }));

// 3. Routes API
app.use('/api/v1', apiRoutes);

// 4. Gestion des erreurs 404
app.use((req, res) => {
  res.status(404).json({ error: 'Route non trouvée' });
});

// 5. Lancement
app.listen(PORT, () => {
  console.log(`🚀 Serveur S2C démarré sur http://localhost:${PORT}`);
});
