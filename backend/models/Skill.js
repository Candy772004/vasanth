const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: {
    type: String,
    enum: ['Languages', 'AI/ML', 'Frontend', 'Backend', 'Database', 'Tools'],
    required: true
  },
  proficiency: {
    type: Number,
    min: 0,
    max: 100,
    default: 80
  },
  icon: String,
  color: String,
  order: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Skill', skillSchema);
