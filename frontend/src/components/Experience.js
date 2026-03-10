import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiBriefcase, FiCalendar, FiMapPin } from 'react-icons/fi';
import './Experience.css';

const experiences = [
  {
    id: 1,
    company: 'Infosys',
    role: 'AI Developer Intern',
    type: 'Internship · Remote',
    period: 'Jul 2025 – Present',
    location: 'Remote',
    color: '#00d4ff',
    logo: 'IN',
    current: true,
    description: 'Working on cutting-edge NLP and AI pipeline optimization projects for internal tools at one of India\'s largest tech companies.',
    highlights: [
      'Developed NLP modules using Python, improving text-processing by 18% for internal tools',
      'Optimized data pipelines, reducing model training time by 22% and memory usage by 15%',
      'Collaborated with cross-functional teams to deploy AI features ensuring high system availability',
    ],
    tech: ['Python', 'NLP', 'TensorFlow', 'Data Pipelines', 'spaCy'],
  },
  {
    id: 2,
    company: 'Upskill Campus',
    role: 'Full Stack Developer Intern',
    type: 'Internship · On-site',
    period: 'Jan 2025 – May 2025',
    location: 'Chennai, TN',
    color: '#7c3aed',
    logo: 'UC',
    current: false,
    description: 'Led frontend and backend development for consumer-facing web applications, delivering responsive UIs and secure APIs.',
    highlights: [
      'Designed responsive UIs using React.js, increasing user engagement by 30%',
      'Architected RESTful APIs with Node.js handling 1,000+ daily requests with high reliability',
      'Implemented JWT authentication, reducing unauthorized access incidents by 40%',
    ],
    tech: ['React.js', 'Node.js', 'Express', 'MongoDB', 'JWT', 'REST APIs'],
  },
  {
    id: 3,
    company: 'Freelance',
    role: 'Web Developer',
    type: 'Freelance · Remote',
    period: '2023 – 2024',
    location: 'Tamil Nadu',
    color: '#10b981',
    logo: 'FL',
    current: false,
    description: 'Delivered custom web development solutions for small businesses and startups across Tamil Nadu.',
    highlights: [
      'Built and deployed 4+ client websites with responsive design',
      'Integrated payment gateways and CMS solutions',
      'Managed end-to-end client communication and project delivery',
    ],
    tech: ['HTML', 'CSS', 'JavaScript', 'React.js', 'WordPress'],
  },
];

const Experience = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="section exp-section" id="experience" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label">My Journey</p>
          <h2 className="section-title">Experience</h2>
          <p className="section-subtitle">Professional experience building AI systems and web applications.</p>
        </motion.div>

        <div className="timeline">
          {/* Vertical line */}
          <div className="timeline-line" />

          {experiences.map((exp, i) => (
            <motion.div
              key={exp.id}
              className="timeline-item"
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.2 + 0.3, duration: 0.6 }}
            >
              {/* Dot */}
              <div className="timeline-dot" style={{ borderColor: exp.color, boxShadow: `0 0 20px ${exp.color}44` }}>
                <span style={{ color: exp.color }}><FiBriefcase size={14} /></span>
              </div>

              {/* Card */}
              <div className="exp-card card">
                <div className="exp-card-header">
                  <div className="exp-logo" style={{ background: `${exp.color}22`, color: exp.color }}>
                    {exp.logo}
                  </div>
                  <div className="exp-title-group">
                    <div className="exp-role-line">
                      <h3 className="exp-role">{exp.role}</h3>
                      {exp.current && <span className="current-badge">Current</span>}
                    </div>
                    <div className="exp-company">{exp.company}</div>
                    <div className="exp-meta">
                      <span><FiCalendar size={12} /> {exp.period}</span>
                      <span><FiMapPin size={12} /> {exp.location}</span>
                      <span className="tag">{exp.type}</span>
                    </div>
                  </div>
                </div>

                <p className="exp-description">{exp.description}</p>

                <ul className="exp-highlights">
                  {exp.highlights.map((h, hi) => (
                    <li key={hi}>
                      <span className="bullet" style={{ color: exp.color }}>▸</span>
                      {h}
                    </li>
                  ))}
                </ul>

                <div className="exp-tech">
                  {exp.tech.map(t => (
                    <span key={t} className="tag" style={{ borderColor: `${exp.color}55`, color: exp.color, background: `${exp.color}11` }}>{t}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
