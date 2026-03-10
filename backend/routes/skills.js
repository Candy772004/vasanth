const express = require('express');
const router = express.Router();
const Skill = require('../models/Skill');

const defaultSkills = [
  { name: 'Python', category: 'Languages', proficiency: 92, order: 1 },
  { name: 'JavaScript', category: 'Languages', proficiency: 88, order: 2 },
  { name: 'Java', category: 'Languages', proficiency: 75, order: 3 },
  { name: 'C/C++', category: 'Languages', proficiency: 70, order: 4 },
  { name: 'TensorFlow', category: 'AI/ML', proficiency: 85, order: 1 },
  { name: 'PyTorch', category: 'AI/ML', proficiency: 80, order: 2 },
  { name: 'OpenCV', category: 'AI/ML', proficiency: 85, order: 3 },
  { name: 'Scikit-learn', category: 'AI/ML', proficiency: 88, order: 4 },
  { name: 'spaCy / NLP', category: 'AI/ML', proficiency: 82, order: 5 },
  { name: 'CNN / Deep Learning', category: 'AI/ML', proficiency: 87, order: 6 },
  { name: 'React.js', category: 'Frontend', proficiency: 90, order: 1 },
  { name: 'HTML5 / CSS3', category: 'Frontend', proficiency: 92, order: 2 },
  { name: 'Tailwind CSS', category: 'Frontend', proficiency: 88, order: 3 },
  { name: 'Node.js', category: 'Backend', proficiency: 85, order: 1 },
  { name: 'Express.js', category: 'Backend', proficiency: 85, order: 2 },
  { name: 'REST APIs', category: 'Backend', proficiency: 88, order: 3 },
  { name: 'FastAPI', category: 'Backend', proficiency: 78, order: 4 },
  { name: 'MongoDB', category: 'Database', proficiency: 85, order: 1 },
  { name: 'PostgreSQL', category: 'Database', proficiency: 75, order: 2 },
  { name: 'Git', category: 'Tools', proficiency: 90, order: 1 },
  { name: 'Docker', category: 'Tools', proficiency: 75, order: 2 },
  { name: 'AWS EC2/S3', category: 'Tools', proficiency: 72, order: 3 },
  { name: 'Linux', category: 'Tools', proficiency: 85, order: 4 },
  { name: 'JWT / Auth', category: 'Tools', proficiency: 88, order: 5 }
];

router.get('/', async (req, res) => {
  try {
    let skills = await Skill.find().sort({ category: 1, order: 1 });
    if (skills.length === 0) {
      skills = await Skill.insertMany(defaultSkills);
    }
    res.json({ success: true, data: skills });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch skills' });
  }
});

module.exports = router;
