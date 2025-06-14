const express = require('express');
const router = express.Router();

// Réserver une chambre
router.post('/', (req, res) => {
  const { client_id, chambre_id, date_debut, date_fin } = req.body;

  req.db.query(
    'INSERT INTO reservations (client_id, chambre_id, date_debut, date_fin) VALUES (?, ?, ?, ?)',
    [client_id, chambre_id, date_debut, date_fin],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.status(201).json({ message: 'Réservation enregistrée ✅', reservation_id: result.insertId });
    }
  );
});

module.exports = router;
