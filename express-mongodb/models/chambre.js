const mongoose = require('mongoose');

const chambreSchema = new mongoose.Schema({
  numero: String,
  type: String,
  prix: Number,
  disponible: Boolean
});

module.exports = mongoose.model('Chambre', chambreSchema);
