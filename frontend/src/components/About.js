import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiMapPin, FiBook, FiBriefcase, FiAward } from 'react-icons/fi';
import './About.css';

const stats = [
  { icon: <FiBriefcase />, value: '2+', label: 'Internships' },
  { icon: <FiBook />, value: '5+', label: 'Projects' },
  { icon: <FiAward />, value: '3', label: 'Certifications' },
  { icon: <FiMapPin />, value: '8.2', label: 'CGPA' },
];

const About = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section className="section about-section" id="about" ref={ref}>
      <div className="container">
        <div className="about-grid">
          {/* Left: Image + Stats */}
          <motion.div
            className="about-visual"
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div className="avatar-container">
              <div className="avatar-ring" />
              <div className="avatar-inner avatar-photo">
                <img src="/profile.jpg" alt="Vasanthakumar R" className="avatar-img" />
              </div>
              <div className="avatar-badge">
                <span>Open to Work ✅</span>
              </div>
            </div>

            <div className="about-stats">
              {stats.map((s, i) => (
                <motion.div
                  key={i}
                  className="stat-item"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 * i + 0.4 }}
                >
                  <span className="stat-icon">{s.icon}</span>
                  <span className="stat-value">{s.value}</span>
                  <span className="stat-desc">{s.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Text */}
          <motion.div
            className="about-text"
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <p className="section-label">Who I Am</p>
            <h2 className="section-title">About Me</h2>

            <div className="about-paragraphs">
              <p>
                I'm <strong>Vasanthakumar R</strong>, a final-year B.Tech student in <span className="text-accent">Artificial Intelligence & Data Science</span> at Sir Isaac Newton College of Engineering and Technology, Tamil Nadu — graduating in 2026 with an 8.2 CGPA.
              </p>
              <p>
                My work sits at the intersection of <span className="text-accent">deep learning</span> and <span className="text-accent">full-stack engineering</span>. I've built production-grade systems including a deepfake detection engine with 96% accuracy and real-time sensing frameworks deployed on React dashboards.
              </p>
              <p>
                Currently interning at <strong>Infosys</strong> as an AI Developer, where I optimize data pipelines and build NLP modules. Previously at <strong>Upskill Campus</strong> delivering responsive React UIs and REST APIs with JWT authentication.
              </p>
              <p>
                When I'm not writing code, I'm exploring new ML papers, contributing to open source, or experimenting with generative AI. I believe the best engineers are also curious scientists.
              </p>
            </div>

            <div className="about-info-grid">
              <div className="info-item">
                <span className="info-label mono">Location</span>
                <span className="info-value">Tamil Nadu, India</span>
              </div>
              <div className="info-item">
                <span className="info-label mono">Email</span>
                <a href="mailto:kumarv02357@gmail.com" className="info-value link-accent">kumarv02357@gmail.com</a>
              </div>
              <div className="info-item">
                <span className="info-label mono">Degree</span>
                <span className="info-value">B.Tech AI & Data Science</span>
              </div>
              <div className="info-item">
                <span className="info-label mono">Status</span>
                <span className="info-value">
                  <span className="status-dot" />Available for Opportunities
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
