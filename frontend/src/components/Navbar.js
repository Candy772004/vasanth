import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-scroll';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi';
import './Navbar.css';

const navLinks = [
  { to: 'about', label: 'About' },
  { to: 'skills', label: 'Skills' },
  { to: 'experience', label: 'Experience' },
  { to: 'projects', label: 'Projects' },
  { to: 'certifications', label: 'Certs' },
  { to: 'contact', label: 'Contact' },
];

const Navbar = () => {
  const { isDark, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on Escape key
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') setMenuOpen(false); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <>
      {/* Backdrop overlay – tap outside to close */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-overlay"
            style={{ display: 'block' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeMenu}
          />
        )}
      </AnimatePresence>

      <motion.nav
        className={`navbar ${scrolled ? 'scrolled' : ''}`}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="container navbar-inner">
          {/* Logo */}
          <Link to="hero" smooth duration={500} className="navbar-logo" onClick={closeMenu}>
            <span className="logo-bracket">&lt;</span>
            <span className="logo-name">VK</span>
            <span className="logo-bracket"> /&gt;</span>
          </Link>

          {/* Desktop Links */}
          <ul className="navbar-links">
            {navLinks.map((link, i) => (
              <motion.li
                key={link.to}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i + 0.3 }}
              >
                <Link
                  to={link.to}
                  smooth
                  duration={500}
                  offset={-70}
                  spy
                  activeClass="active"
                  className="nav-link"
                >
                  {link.label}
                </Link>
              </motion.li>
            ))}
          </ul>

          {/* Actions */}
          <div className="navbar-actions">
            <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
              <AnimatePresence mode="wait">
                <motion.span
                  key={isDark ? 'dark' : 'light'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isDark ? <FiSun size={18} /> : <FiMoon size={18} />}
                </motion.span>
              </AnimatePresence>
            </button>

            <a
              href="/Vasanthakumar_Resume.pdf"
              download
              className="btn btn-primary resume-btn"
              target="_blank"
              rel="noreferrer"
            >
              Resume
            </a>

            <button
              className="hamburger"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              className="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.28, ease: 'easeInOut' }}
            >
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                >
                  <Link
                    to={link.to}
                    smooth
                    duration={500}
                    offset={-70}
                    spy
                    activeClass="active"
                    className="mobile-link"
                    onClick={closeMenu}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <div className="mobile-menu-divider" />

              <a
                href="/Vasanthakumar_Resume.pdf"
                download
                className="btn btn-primary mobile-resume-btn"
                onClick={closeMenu}
              >
                Download Resume
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};

export default Navbar;
