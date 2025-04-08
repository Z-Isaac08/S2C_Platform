const express = require('express');
const app = express();

const connectDB = require('./Config/database');
const cors = require('cors');


// Middlewares
app.use(express.json());
app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
}));
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
