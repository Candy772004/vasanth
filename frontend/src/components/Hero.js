import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { TypeAnimation } from 'react-type-animation';
import { FiGithub, FiLinkedin, FiMail, FiArrowDown } from 'react-icons/fi';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero" id="hero">
      {/* Animated background grid */}
      <div className="hero-grid" />
      {/* Glow orbs */}
      <div className="glow-orb glow-1" />
      <div className="glow-orb glow-2" />

      <div className="container hero-content">
        <div className="hero-text">
          <motion.div
            className="hero-greeting"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="mono">👋 Hello, World! I'm</span>
          </motion.div>

          <motion.h1
            className="hero-name"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            Vasantha<span className="name-accent">kumar R</span>
          </motion.h1>

          <motion.div
            className="hero-role"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <TypeAnimation
              sequence={[
                'Full Stack Developer',
                2000,
                'AI Engineer',
                2000,
                'Deep Learning Specialist',
                2000,
                'Computer Vision Engineer',
                2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              className="typed-text"
            />
          </motion.div>

          <motion.p
            className="hero-bio"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
          >
            Final-year B.Tech <span className="text-accent">AI & Data Science</span> student building intelligent,
            scalable systems. From 96%-accurate deepfake detectors to real-time crowd-sensing frameworks —
            I bridge the gap between <span className="text-accent">AI research</span> and <span className="text-accent">production software</span>.
          </motion.p>

          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Link to="projects" smooth duration={500} offset={-70}>
              <button className="btn btn-primary">View My Work</button>
            </Link>
            <Link to="contact" smooth duration={500} offset={-70}>
              <button className="btn btn-outline">Get In Touch</button>
            </Link>
            <a
              href="/Vasanthakumar_Resume.pdf"
              download
              className="btn btn-outline"
            >
              Resume ↓
            </a>
          </motion.div>

          <motion.div
            className="hero-socials"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <a href="https://github.com/Candy772004" target="_blank" rel="noreferrer" className="social-link" aria-label="GitHub">
              <FiGithub size={20} />
            </a>
            <a href="https://linkedin.com/in/vasanthakumar-ravichandran" target="_blank" rel="noreferrer" className="social-link" aria-label="LinkedIn">
              <FiLinkedin size={20} />
            </a>
            <a href="mailto:kumarv02357@gmail.com" className="social-link" aria-label="Email">
              <FiMail size={20} />
            </a>
          </motion.div>
        </div>

        {/* Right visual element */}
        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {/* Profile photo */}
          <div className="hero-photo-wrap">
            <div className="hero-photo-ring" />
            <img src="/profile.jpg" alt="Vasanthakumar R" className="hero-photo" />
          </div>

          <div className="code-card">
            <div className="code-header">
              <span className="dot red" /><span className="dot yellow" /><span className="dot green" />
              <span className="code-filename mono">vasanth.py</span>
            </div>
            <pre className="code-body mono">
{`developer = {
  "name": "Vasanthakumar R",
  "role": [
    "Full Stack Developer",
    "AI Engineer"
  ],
  "stack": {
    "ai": ["TensorFlow", "PyTorch",
           "OpenCV", "spaCy"],
    "web": ["React", "Node.js",
            "MongoDB", "Express"],
    "tools": ["Docker", "AWS", "Git"]
  },
  "currently": "@ Infosys (AI Intern)",
  "open_to": "opportunities ✅"
}`}
            </pre>
          </div>

          {/* Floating stats – row on mobile, absolute on desktop */}
          <div className="stat-badges-row">
            <motion.div
              className="stat-badge stat-1"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <span className="stat-num">96%</span>
              <span className="stat-label">Model Accuracy</span>
            </motion.div>
            <motion.div
              className="stat-badge stat-2"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            >
              <span className="stat-num">5+</span>
              <span className="stat-label">AI Projects</span>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="scroll-indicator"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Link to="about" smooth duration={500} offset={-70}>
          <FiArrowDown size={20} />
        </Link>
      </motion.div>
    </section>
  );
};

export default Hero;
