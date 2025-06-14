const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Connexion MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Mets ton utilisateur MySQL
  password: '', // Mets ton mot de passe MySQL si besoin
  database: 'hotel' // Nom de ta base créée dans phpMyAdmin
});

// Connexion à la base
db.connect((err) => {
  if (err) {
    console.error('❌ Erreur de connexion à MySQL :', err.message);
  } else {
    console.log('✅ Connexion MySQL réussie');
  }
});

// Injecter la connexion dans les routes
app.use((req, res, next) => {
  req.db = db; // on attache la connexion à chaque requête
  next();
});

// Routes

// Auth routes
app.use('/api', require('./routes/auth'));

// Route par défaut
app.get('/', (req, res) => {
  res.send('✅ API de réservation d’hôtel en fonctionnement');
});

// Lancement du serveur
app.listen(PORT, () => {
  console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
});
