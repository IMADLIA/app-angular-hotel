const express = require('express');
const router = express.Router();

// Paiement pour une réservation
router.post('/', (req, res) => {
  const { reservation_id, montant } = req.body;

  req.db.query(
    'INSERT INTO paiements (reservation_id, montant) VALUES (?, ?)',
    [reservation_id, montant],
    (err, result) => {
      if (err) return res.status(500).json(err);

      // Met à jour le statut de la réservation
      req.db.query(
        'UPDATE reservations SET statut = "payée" WHERE id = ?',
        [reservation_id],
        (err2) => {
          if (err2) return res.status(500).json(err2);
          res.status(201).json({ message: 'Paiement effectué et réservation confirmée ✅' });
        }
      );
    }
  );
});

module.exports = router;
