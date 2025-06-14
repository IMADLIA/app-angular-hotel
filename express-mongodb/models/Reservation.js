const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  clientId: mongoose.Schema.Types.ObjectId,
  chambreId: mongoose.Schema.Types.ObjectId,
  date: String,
  pays: String
});

module.exports = mongoose.model('Reservation', reservationSchema);
