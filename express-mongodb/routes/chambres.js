const express = require('express');
const router = express.Router();

// GET toutes les chambres
router.get('/', (req, res) => {
  req.db.query('SELECT * FROM chambres', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

module.exports = router;
