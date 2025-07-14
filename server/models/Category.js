const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  image: { type: String }, // Optional category image
});

module.exports = mongoose.model('Category', categorySchema);
