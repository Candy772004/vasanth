import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import axios from 'axios';
import { FiGithub, FiExternalLink, FiStar, FiGitBranch } from 'react-icons/fi';
import './Projects.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
const GITHUB_USER = process.env.REACT_APP_GITHUB_USERNAME || 'Candy772004';

const staticProjects = [
  {
    _id: '1',
    title: 'Deepfake Detection System',
    description: 'AI-powered system to detect AI-manipulated media using CNN and ResNet-50 architecture.',
    techStack: ['Python', 'TensorFlow', 'ResNet-50', 'CNN', 'OpenCV', 'FastAPI'],
    category: 'AI/ML',
    githubUrl: `https://github.com/${GITHUB_USER}`,
    highlights: ['96% accuracy on benchmark datasets', 'Frame-by-frame artifact analysis', 'Real-time Python API deployment'],
    featured: true,
  },
  {
    _id: '2',
    title: 'Intelligent Crowd Sensing',
    description: 'Real-time environmental data aggregation from mobile sensors with ML-powered noise filtering.',
    techStack: ['Python', 'React.js', 'Node.js', 'MongoDB', 'Scikit-learn'],
    category: 'Full Stack',
    githubUrl: `https://github.com/${GITHUB_USER}`,
    highlights: ['90%+ data integrity', 'Real-time dashboard', 'Scalable mobile sensor aggregation'],
    featured: true,
  },
  {
    _id: '3',
    title: 'Secure Vault',
    description: 'End-to-end encrypted file sharing platform with JWT authentication and audit logging.',
    techStack: ['FastAPI', 'PostgreSQL', 'Python', 'JWT', 'Docker'],
    category: 'Backend',
    githubUrl: `https://github.com/${GITHUB_USER}`,
    highlights: ['HTTPS encryption', 'JWT auth system', 'Role-based access control'],
    featured: true,
  },
  {
    _id: '4',
    title: 'AI Chatbot with NLP',
    description: 'Intelligent chatbot using spaCy and NLTK for automated form processing and NLP workflows.',
    techStack: ['Python', 'spaCy', 'NLTK', 'React.js'],
    category: 'AI/ML',
    githubUrl: `https://github.com/${GITHUB_USER}`,
    highlights: ['Intent recognition', 'Entity extraction', 'Multi-turn conversations'],
    featured: false,
  },
  {
    _id: '5',
    title: 'Image Recognition & Object Detection',
    description: 'Real-time object detection pipeline using OpenCV and TensorFlow with high accuracy.',
    techStack: ['Python', 'TensorFlow', 'OpenCV', 'CNN', 'NumPy'],
    category: 'AI/ML',
    githubUrl: `https://github.com/${GITHUB_USER}`,
    highlights: ['High detection accuracy', 'Real-time processing', 'Multi-class classification'],
    featured: false,
  },
];

const categoryColors = {
  'AI/ML': '#00d4ff',
  'Full Stack': '#7c3aed',
  'Backend': '#10b981',
  'Frontend': '#f59e0b',
  'Other': '#ec4899',
};

const ProjectCard = ({ project, index, inView }) => {
  const color = categoryColors[project.category] || '#00d4ff';

  return (
    <motion.div
      className="project-card card"
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -8 }}
    >
      <div className="project-card-top">
        <div className="project-category-badge" style={{ color, background: `${color}15`, borderColor: `${color}40` }}>
          {project.category}
        </div>
        <div className="project-links">
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noreferrer" className="project-link-btn" aria-label="GitHub">
              <FiGithub size={16} />
            </a>
          )}
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noreferrer" className="project-link-btn" aria-label="Live">
              <FiExternalLink size={16} />
            </a>
          )}
        </div>
      </div>

      <div className="project-accent-bar" style={{ background: `linear-gradient(90deg, ${color}, transparent)` }} />

      <h3 className="project-title">{project.title}</h3>
      <p className="project-description">{project.description}</p>

      <ul className="project-highlights">
        {(project.highlights || []).slice(0, 3).map((h, i) => (
          <li key={i}>
            <span style={{ color }}>◈</span> {h}
          </li>
        ))}
      </ul>

      <div className="project-tech">
        {(project.techStack || []).map(t => (
          <span key={t} className="tech-tag mono">{t}</span>
        ))}
      </div>
    </motion.div>
  );
};

const GitHubRepoCard = ({ repo }) => (
  <motion.a
    href={repo.html_url}
    target="_blank"
    rel="noreferrer"
    className="github-repo-card card"
    whileHover={{ y: -4 }}
    transition={{ duration: 0.2 }}
  >
    <div className="repo-top">
      <FiGithub size={16} className="repo-icon" />
      <span className="repo-name">{repo.name}</span>
    </div>
    <p className="repo-desc">{repo.description || 'No description available'}</p>
    <div className="repo-stats">
      <span><FiStar size={12} /> {repo.stargazers_count}</span>
      <span><FiGitBranch size={12} /> {repo.forks_count}</span>
      {repo.language && <span className="repo-lang">{repo.language}</span>}
    </div>
  </motion.a>
);

const Projects = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });
  const [projects, setProjects] = useState(staticProjects);
  const [repos, setRepos] = useState([]);
  const [filter, setFilter] = useState('All');
  const [showGithub, setShowGithub] = useState(false);

  useEffect(() => {
    axios.get(`${API_URL}/projects`).then(r => { if (r.data?.data?.length) setProjects(r.data.data); }).catch(() => {});
    axios.get(`https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=6`)
      .then(r => setRepos(r.data || []))
      .catch(() => {});
  }, []);

  const categories = ['All', ...new Set(projects.map(p => p.category))];
  const filtered = filter === 'All' ? projects : projects.filter(p => p.category === filter);

  return (
    <section className="section projects-section" id="projects" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
        >
          <p className="section-label">What I've Built</p>
          <h2 className="section-title">Projects</h2>
          <p className="section-subtitle">A showcase of AI systems, full-stack applications, and open-source contributions.</p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div className="project-filters" initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.2 }}>
          {categories.map(cat => (
            <button key={cat} className={`filter-btn ${filter === cat ? 'active' : ''}`} onClick={() => setFilter(cat)}>
              {cat}
            </button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            className="projects-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {filtered.map((project, i) => (
              <ProjectCard key={project._id} project={project} index={i} inView={inView} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* GitHub repos section */}
        <motion.div className="github-section" initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.6 }}>
          <button className="github-toggle-btn" onClick={() => setShowGithub(!showGithub)}>
            <FiGithub size={18} />
            {showGithub ? 'Hide' : 'Show'} GitHub Repositories
          </button>

          <AnimatePresence>
            {showGithub && repos.length > 0 && (
              <motion.div
                className="repos-grid"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4 }}
              >
                {repos.map(repo => <GitHubRepoCard key={repo.id} repo={repo} />)}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
