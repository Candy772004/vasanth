import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import axios from 'axios';
import './Skills.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const skillCategories = {
  Languages: { color: '#f59e0b', icon: '{}' },
  'AI/ML': { color: '#00d4ff', icon: '🤖' },
  Frontend: { color: '#7c3aed', icon: '🎨' },
  Backend: { color: '#10b981', icon: '⚙️' },
  Database: { color: '#f97316', icon: '🗄️' },
  Tools: { color: '#ec4899', icon: '🔧' },
};

// Static fallback data
const staticSkills = [
  { name: 'Python', category: 'Languages', proficiency: 92 },
  { name: 'JavaScript', category: 'Languages', proficiency: 88 },
  { name: 'Java', category: 'Languages', proficiency: 75 },
  { name: 'C / C++', category: 'Languages', proficiency: 70 },
  { name: 'TensorFlow', category: 'AI/ML', proficiency: 85 },
  { name: 'PyTorch', category: 'AI/ML', proficiency: 80 },
  { name: 'OpenCV', category: 'AI/ML', proficiency: 85 },
  { name: 'Scikit-learn', category: 'AI/ML', proficiency: 88 },
  { name: 'spaCy / NLP', category: 'AI/ML', proficiency: 82 },
  { name: 'CNN / Deep Learning', category: 'AI/ML', proficiency: 87 },
  { name: 'React.js', category: 'Frontend', proficiency: 90 },
  { name: 'HTML5 / CSS3', category: 'Frontend', proficiency: 92 },
  { name: 'Tailwind CSS', category: 'Frontend', proficiency: 88 },
  { name: 'Node.js', category: 'Backend', proficiency: 85 },
  { name: 'Express.js', category: 'Backend', proficiency: 85 },
  { name: 'FastAPI', category: 'Backend', proficiency: 78 },
  { name: 'MongoDB', category: 'Database', proficiency: 85 },
  { name: 'PostgreSQL', category: 'Database', proficiency: 75 },
  { name: 'Git', category: 'Tools', proficiency: 90 },
  { name: 'Docker', category: 'Tools', proficiency: 75 },
  { name: 'AWS EC2/S3', category: 'Tools', proficiency: 72 },
  { name: 'Linux', category: 'Tools', proficiency: 85 },
  { name: 'JWT / Auth', category: 'Tools', proficiency: 88 },
];

const SkillBar = ({ skill, delay, inView }) => {
  const cat = skillCategories[skill.category] || { color: '#00d4ff' };
  return (
    <motion.div
      className="skill-item"
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay, duration: 0.4 }}
    >
      <div className="skill-header">
        <span className="skill-name">{skill.name}</span>
        <span className="skill-pct" style={{ color: cat.color }}>{skill.proficiency}%</span>
      </div>
      <div className="skill-track">
        <motion.div
          className="skill-fill"
          style={{ background: `linear-gradient(90deg, ${cat.color}, ${cat.color}88)` }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.proficiency}%` } : {}}
          transition={{ delay: delay + 0.2, duration: 0.8, ease: 'easeOut' }}
        />
      </div>
    </motion.div>
  );
};

const Skills = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [skills, setSkills] = useState(staticSkills);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    axios.get(`${API_URL}/skills`)
      .then(r => { if (r.data?.data?.length) setSkills(r.data.data); })
      .catch(() => {});
  }, []);

  const grouped = skills.reduce((acc, s) => {
    acc[s.category] = acc[s.category] || [];
    acc[s.category].push(s);
    return acc;
  }, {});

  const categories = ['All', ...Object.keys(skillCategories)];

  const filteredGrouped = activeCategory === 'All'
    ? grouped
    : { [activeCategory]: grouped[activeCategory] || [] };

  return (
    <section className="section skills-section" id="skills" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label">What I Know</p>
          <h2 className="section-title">Technical Skills</h2>
          <p className="section-subtitle">A curated view of my technical toolkit — from AI frameworks to full-stack technologies.</p>
        </motion.div>

        {/* Category filter tabs */}
        <motion.div
          className="category-tabs"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
        >
          {categories.map(cat => (
            <button
              key={cat}
              className={`cat-tab ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
              style={activeCategory === cat && cat !== 'All'
                ? { borderColor: skillCategories[cat]?.color, color: skillCategories[cat]?.color }
                : {}
              }
            >
              {cat !== 'All' && <span className="cat-icon">{skillCategories[cat]?.icon}</span>}
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Skills grid by category */}
        <div className="skills-grid">
          {Object.entries(filteredGrouped).map(([category, catSkills], ci) => {
            const meta = skillCategories[category] || {};
            return (
              <motion.div
                key={category}
                className="skills-group"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: ci * 0.1 + 0.3 }}
              >
                <div className="group-header">
                  <span className="group-icon">{meta.icon}</span>
                  <h3 className="group-title" style={{ color: meta.color }}>{category}</h3>
                  <span className="group-count">{catSkills.length} skills</span>
                </div>
                <div className="group-skills">
                  {catSkills.map((skill, si) => (
                    <SkillBar key={skill.name} skill={skill} delay={si * 0.06} inView={inView} />
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
