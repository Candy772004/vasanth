import React from 'react';
import { Link } from 'react-scroll';
import { FiGithub, FiLinkedin, FiMail, FiHeart } from 'react-icons/fi';
import './Footer.css';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-glow" />
      <div className="container footer-inner">
        {/* Logo & tagline */}
        <div className="footer-brand">
          <div className="footer-logo">
            <span className="logo-bracket">&lt;</span>
            <span className="logo-name">VK</span>
            <span className="logo-bracket"> /&gt;</span>
          </div>
          <p className="footer-tagline">Building intelligent systems & scalable web applications.</p>
          <div className="footer-socials">
            <a href="https://github.com/Candy772004" target="_blank" rel="noreferrer" className="footer-social" aria-label="GitHub">
              <FiGithub size={18} />
            </a>
            <a href="https://linkedin.com/in/vasanthakumar-ravichandran" target="_blank" rel="noreferrer" className="footer-social" aria-label="LinkedIn">
              <FiLinkedin size={18} />
            </a>
            <a href="mailto:kumarv02357@gmail.com" className="footer-social" aria-label="Email">
              <FiMail size={18} />
            </a>
          </div>
        </div>

        {/* Quick links */}
        <div className="footer-links-group">
          <div className="footer-links-col">
            <h4 className="footer-col-title">Navigate</h4>
            {['about', 'skills', 'experience', 'projects', 'contact'].map(s => (
              <Link key={s} to={s} smooth duration={500} offset={-70} className="footer-link">
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </Link>
            ))}
          </div>
          <div className="footer-links-col">
            <h4 className="footer-col-title">Connect</h4>
            <a href="https://github.com/Candy772004" target="_blank" rel="noreferrer" className="footer-link">GitHub</a>
            <a href="https://linkedin.com/in/vasanthakumar-ravichandran" target="_blank" rel="noreferrer" className="footer-link">LinkedIn</a>
            <a href="mailto:kumarv02357@gmail.com" className="footer-link">Email Me</a>
            <a href="/Vasanthakumar_Resume.pdf" download className="footer-link">Resume</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p className="footer-copy">
            © {year} Vasanthakumar R. Built with <FiHeart className="heart-icon" /> using MERN Stack.
          </p>
          <p className="footer-location">Tamil Nadu, India 🇮🇳</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
