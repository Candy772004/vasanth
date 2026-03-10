import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import axios from 'axios';
import { FiMail, FiMapPin, FiLinkedin, FiGithub, FiSend, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import './Contact.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const initialForm = { name: '', email: '', subject: '', message: '' };

const Contact = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null); // 'success' | 'error' | null
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim() || form.name.length < 2) e.name = 'Name must be at least 2 characters';
    if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email address';
    if (!form.subject.trim() || form.subject.length < 3) e.subject = 'Subject must be at least 3 characters';
    if (!form.message.trim() || form.message.length < 10) e.message = 'Message must be at least 10 characters';
    return e;
  };

  const handleChange = e => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors(prev => ({ ...prev, [e.target.name]: '' }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${API_URL}/contact`, form);
      setStatus('success');
      setForm(initialForm);
    } catch (err) {
      setStatus('error');
    } finally {
      setLoading(false);
      setTimeout(() => setStatus(null), 5000);
    }
  };

  return (
    <section className="section contact-section" id="contact" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label">Let's Talk</p>
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-subtitle">Open to full-time roles, internships, freelance projects, and collaboration. Drop me a message!</p>
        </motion.div>

        <div className="contact-grid">
          {/* Left: Info */}
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="contact-info-card card">
              <h3 className="info-card-title">Contact Information</h3>
              <div className="info-items">
                <a href="mailto:kumarv02357@gmail.com" className="info-item-link">
                  <div className="info-icon-wrap"><FiMail size={18} /></div>
                  <div>
                    <div className="info-type">Email</div>
                    <div className="info-val">kumarv02357@gmail.com</div>
                  </div>
                </a>
                <div className="info-item-link">
                  <div className="info-icon-wrap"><FiMapPin size={18} /></div>
                  <div>
                    <div className="info-type">Location</div>
                    <div className="info-val">Tamil Nadu, India</div>
                  </div>
                </div>
                <a href="https://linkedin.com/in/vasanthakumar-ravichandran" target="_blank" rel="noreferrer" className="info-item-link">
                  <div className="info-icon-wrap"><FiLinkedin size={18} /></div>
                  <div>
                    <div className="info-type">LinkedIn</div>
                    <div className="info-val">vasanthakumar-ravichandran</div>
                  </div>
                </a>
                <a href="https://github.com/Candy772004" target="_blank" rel="noreferrer" className="info-item-link">
                  <div className="info-icon-wrap"><FiGithub size={18} /></div>
                  <div>
                    <div className="info-type">GitHub</div>
                    <div className="info-val">Candy772004</div>
                  </div>
                </a>
              </div>
            </div>

            <div className="availability-card card">
              <div className="avail-dot" />
              <div>
                <div className="avail-title">Open to Opportunities</div>
                <div className="avail-subtitle">Full-time · Internship · Freelance · Remote / Hybrid</div>
              </div>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <form className="contact-form card" onSubmit={handleSubmit} noValidate>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="name">Your Name</label>
                  <input
                    id="name" name="name" type="text"
                    className={`form-input ${errors.name ? 'error' : ''}`}
                    placeholder="John Doe"
                    value={form.name} onChange={handleChange}
                  />
                  {errors.name && <span className="form-error">{errors.name}</span>}
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="email">Email Address</label>
                  <input
                    id="email" name="email" type="email"
                    className={`form-input ${errors.email ? 'error' : ''}`}
                    placeholder="john@example.com"
                    value={form.email} onChange={handleChange}
                  />
                  {errors.email && <span className="form-error">{errors.email}</span>}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="subject">Subject</label>
                <input
                  id="subject" name="subject" type="text"
                  className={`form-input ${errors.subject ? 'error' : ''}`}
                  placeholder="Job Opportunity / Collaboration..."
                  value={form.subject} onChange={handleChange}
                />
                {errors.subject && <span className="form-error">{errors.subject}</span>}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="message">Message</label>
                <textarea
                  id="message" name="message" rows="5"
                  className={`form-input form-textarea ${errors.message ? 'error' : ''}`}
                  placeholder="Hello Vasanth, I'd like to discuss..."
                  value={form.message} onChange={handleChange}
                />
                {errors.message && <span className="form-error">{errors.message}</span>}
              </div>

              {/* Status messages */}
              {status === 'success' && (
                <motion.div
                  className="status-msg success-msg"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <FiCheckCircle size={18} /> Message sent! I'll get back to you soon.
                </motion.div>
              )}
              {status === 'error' && (
                <motion.div
                  className="status-msg error-msg"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <FiAlertCircle size={18} /> Failed to send. Please try again or email directly.
                </motion.div>
              )}

              <button type="submit" className="btn btn-primary submit-btn" disabled={loading}>
                {loading ? (
                  <span className="loader" />
                ) : (
                  <><FiSend size={16} /> Send Message</>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
