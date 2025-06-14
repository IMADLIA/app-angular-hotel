// routes/clients.js
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Définir un schéma Client
const Client = mongoose.model('Client', new mongoose.Schema({
  nom: String,
  email: String,
  password: String
}));

// Enregistrement (Signup)
router.post('/register', async (req, res) => {
  try {
    const nouveauClient = new Client(req.body);
    await nouveauClient.save();
    res.status(201).json({ message: 'Client inscrit avec succès' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Connexion (Login)
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const client = await Client.findOne({ email });
    if (!client || client.password !== password) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }
    res.json({ message: 'Connexion réussie', client });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
