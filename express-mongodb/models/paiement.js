const mongoose = require('mongoose');

const paiementSchema = new mongoose.Schema({
  montant: Number,
  clientId: String,
  datePaiement: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Paiement', paiementSchema);
