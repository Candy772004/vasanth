import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiAward, FiExternalLink } from 'react-icons/fi';
import './Certifications.css';

const certs = [
  {
    id: 1,
    title: 'Artificial Intelligence Internship',
    issuer: 'Infosys',
    date: '2025',
    color: '#00d4ff',
    icon: '🤖',
    description: 'Completed AI developer internship with focus on NLP modules and data pipeline optimization.',
    skills: ['Python', 'NLP', 'TensorFlow', 'Data Pipelines'],
  },
  {
    id: 2,
    title: 'Full Stack Development',
    issuer: 'Upskill Campus',
    date: '2025',
    color: '#7c3aed',
    icon: '🌐',
    description: 'Mastered end-to-end web application development using the MERN stack.',
    skills: ['React.js', 'Node.js', 'MongoDB', 'Express', 'JWT'],
  },
  {
    id: 3,
    title: 'Python for Data Science',
    issuer: 'IBM',
    date: '2024',
    color: '#f59e0b',
    icon: '📊',
    description: 'Certified in data science using Python including pandas, NumPy, and visualization libraries.',
    skills: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Jupyter'],
  },
];

const Certifications = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="section certs-section" id="certifications" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label">Credentials</p>
          <h2 className="section-title">Certifications</h2>
          <p className="section-subtitle">Professional certifications validating expertise in AI, full-stack development, and data science.</p>
        </motion.div>

        <div className="certs-grid">
          {certs.map((cert, i) => (
            <motion.div
              key={cert.id}
              className="cert-card card"
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15 + 0.3 }}
              whileHover={{ y: -6 }}
            >
              <div className="cert-icon-wrap" style={{ background: `${cert.color}15`, border: `1px solid ${cert.color}40` }}>
                <span className="cert-emoji">{cert.icon}</span>
                <FiAward className="cert-award-icon" style={{ color: cert.color }} />
              </div>

              <div className="cert-glow-bar" style={{ background: `linear-gradient(90deg, ${cert.color}, transparent)` }} />

              <div className="cert-body">
                <div className="cert-meta">
                  <span className="cert-issuer" style={{ color: cert.color }}>{cert.issuer}</span>
                  <span className="cert-date mono">{cert.date}</span>
                </div>
                <h3 className="cert-title">{cert.title}</h3>
                <p className="cert-description">{cert.description}</p>
                <div className="cert-skills">
                  {cert.skills.map(s => (
                    <span key={s} className="cert-skill-tag" style={{ color: cert.color, background: `${cert.color}10`, borderColor: `${cert.color}30` }}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Education section */}
        <motion.div
          className="education-block"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7 }}
        >
          <h3 className="edu-heading">Education</h3>
          <div className="edu-cards">
            <div className="edu-card card">
              <div className="edu-left">
                <div className="edu-degree">B.Tech — Artificial Intelligence & Data Science</div>
                <div className="edu-school">Sir Isaac Newton College of Engineering and Technology</div>
                <div className="edu-period mono">2022 – 2026</div>
              </div>
              <div className="edu-cgpa">
                <span className="cgpa-num">8.2</span>
                <span className="cgpa-label">CGPA</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Certifications;
