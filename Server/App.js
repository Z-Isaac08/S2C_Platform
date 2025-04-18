const express = require('express');
const app = express();
const path = require('path');

const connectDB = require('./Config/database');
const cors = require('cors');


// Middlewares
app.use(express.json());
const corsOptions = {
  origin: ['https://lastructure-s2c.netlify.app', 'http://localhost:5173'], // sans slash à la fin
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
// Connexion MongoDB
connectDB();
// Routes
app.use('/api/participants', require('./Routes/participants.route'));
app.use('/api/inscriptions', require('./Routes/inscription.route'));
app.use('/api/soutiens', require('./Routes/soutien.route'));
app.use('/api/engagements', require('./Routes/engagement.route'));
app.use('/api/goodies', require('./Routes/goodie.route'));
app.use('/api/commandes', require('./Routes/commande.route'));
app.use('/api/commande-items', require('./Routes/article_commande.route'));


// Lancer serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
