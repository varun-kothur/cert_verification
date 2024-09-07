const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
  name: String,
  course: String,
  email: String,
  ipfsHash: String,
});

const Certificate = mongoose.model('Certificate', certificateSchema);

module.exports = Certificate;
