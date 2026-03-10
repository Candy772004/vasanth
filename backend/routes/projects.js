const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

const defaultProjects = [
  {
    title: 'Deepfake Detection System',
    description: 'AI-powered system to detect AI-manipulated media using deep learning.',
    longDescription: 'Built a sophisticated deep learning model leveraging CNN and ResNet-50 architecture to identify AI-generated fake videos and images. The system performs frame-by-frame artifact analysis to detect subtle inconsistencies left behind by generative AI models.',
    techStack: ['Python', 'TensorFlow', 'ResNet-50', 'CNN', 'OpenCV', 'FastAPI'],
    category: 'AI/ML',
    githubUrl: 'https://github.com/Candy772004',
    highlights: ['96% accuracy on benchmark datasets', 'Frame-by-frame artifact analysis', 'Real-time Python API deployment', 'Handles both images and video streams'],
    featured: true,
    order: 1
  },
  {
    title: 'Intelligent Crowd Sensing Framework',
    description: 'Real-time environmental data aggregation from mobile sensors with ML-powered noise filtering.',
    longDescription: 'Designed a scalable framework to collect and process environmental data from distributed mobile sensors in real-time. Applied machine learning algorithms to filter noisy sensor readings and built an interactive React.js dashboard for spatial-temporal data visualization.',
    techStack: ['Python', 'React.js', 'Node.js', 'MongoDB', 'Machine Learning', 'Scikit-learn'],
    category: 'Full Stack',
    githubUrl: 'https://github.com/Candy772004',
    highlights: ['90%+ data integrity after noise filtering', 'Real-time spatial-temporal visualization', 'Scalable mobile sensor aggregation', 'Interactive React dashboard'],
    featured: true,
    order: 2
  },
  {
    title: 'Secure Vault – Encrypted File Transfer',
    description: 'End-to-end encrypted file sharing platform with JWT authentication.',
    longDescription: 'A secure file-sharing platform built with FastAPI and PostgreSQL. Implements HTTPS encryption and JWT-based authentication for secure user sessions. Features role-based access control and audit logging.',
    techStack: ['FastAPI', 'PostgreSQL', 'Python', 'JWT', 'HTTPS', 'Docker'],
    category: 'Backend',
    githubUrl: 'https://github.com/Candy772004',
    highlights: ['End-to-end HTTPS encryption', 'JWT authentication system', 'Role-based access control', 'Audit trail logging'],
    featured: true,
    order: 3
  },
  {
    title: 'AI Chatbot with NLP Automation',
    description: 'Intelligent chatbot with natural language processing for automated form handling.',
    longDescription: 'Developed a conversational AI chatbot using spaCy and NLTK for natural language understanding. The bot automates form processing workflows, extracts entities from user input, and routes queries intelligently.',
    techStack: ['Python', 'spaCy', 'NLTK', 'NLP', 'React.js', 'Node.js'],
    category: 'AI/ML',
    githubUrl: 'https://github.com/Candy772004',
    highlights: ['Intent recognition with spaCy', 'Automated form processing', 'Named entity extraction', 'Multi-turn conversation handling'],
    featured: false,
    order: 4
  },
  {
    title: 'Image Recognition & Object Detection',
    description: 'Real-time object detection system using OpenCV and TensorFlow.',
    longDescription: 'Built a comprehensive computer vision pipeline using OpenCV and TensorFlow for real-time object detection and image classification. Achieves high detection accuracy across multiple object categories.',
    techStack: ['Python', 'TensorFlow', 'OpenCV', 'CNN', 'NumPy', 'Matplotlib'],
    category: 'AI/ML',
    githubUrl: 'https://github.com/Candy772004',
    highlights: ['High object detection accuracy', 'Real-time processing pipeline', 'Multi-class classification', 'Optimized inference speed'],
    featured: false,
    order: 5
  }
];

// GET /api/projects
router.get('/', async (req, res) => {
  try {
    let projects = await Project.find().sort({ order: 1, createdAt: -1 });
    if (projects.length === 0) {
      projects = await Project.insertMany(defaultProjects);
    }
    res.json({ success: true, data: projects });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

// GET /api/projects/featured
router.get('/featured', async (req, res) => {
  try {
    const projects = await Project.find({ featured: true }).sort({ order: 1 });
    res.json({ success: true, data: projects });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch featured projects' });
  }
});

module.exports = router;
