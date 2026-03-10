const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  longDescription: String,
  techStack: [String],
  category: {
    type: String,
    enum: ['AI/ML', 'Full Stack', 'Backend', 'Frontend', 'Other'],
    default: 'Other'
  },
  githubUrl: String,
  liveUrl: String,
  image: String,
  highlights: [String],
  featured: {
    type: Boolean,
    default: false
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Project', projectSchema);
