const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

// Inscription
router.post('/register', (req, res) => {
    const { name, email, password, phone } = req.body;
  
    const sql = 'INSERT INTO clients (name, email, password, phone) VALUES (?, ?, ?, ?)';
    db.query(sql, [name, email, password, phone], (err, result) => {
      if (err) {
        console.error('Erreur d’inscription :', err);
        return res.status(500).send('Erreur serveur');
      }
      res.status(201).send('Inscription réussie');
    });
  });

// Connexion
router.post('/login', (req, res) => {
  const { email, mot_de_passe } = req.body;

  req.db.query('SELECT * FROM clients WHERE email = ?', [email], async (err, results) => {
    if (err) return res.status(500).json(err);
    if (results.length === 0) return res.status(401).json({ message: 'Email incorrect' });

    const user = results[0];
    const valid = await bcrypt.compare(mot_de_passe, user.mot_de_passe);
    if (!valid) return res.status(401).json({ message: 'Mot de passe incorrect' });

    res.status(200).json({ message: 'Connexion réussie ✅', client: user });
  });
});

module.exports = router;
