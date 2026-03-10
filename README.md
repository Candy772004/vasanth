# 🚀 Vasanthakumar R — Portfolio Website (MERN Stack)

A complete, production-ready portfolio website built with the **MERN Stack** (MongoDB, Express.js, React.js, Node.js).

**Live Demo**: [vasanthakumar.vercel.app](https://vasanthakumar.vercel.app) *(after deployment)*
**GitHub**: [Candy772004](https://github.com/Candy772004)

---

## 📁 Project Structure

```
vasanth-portfolio/
│
├── frontend/                        # React.js frontend
│   ├── public/
│   │   └── index.html               # SEO-optimized HTML
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js + .css     # Fixed navbar with dark/light toggle
│   │   │   ├── Hero.js + .css       # Hero with typing animation & code card
│   │   │   ├── About.js + .css      # About with stats & info grid
│   │   │   ├── Skills.js + .css     # Animated skill bars by category
│   │   │   ├── Experience.js + .css # Timeline with company cards
│   │   │   ├── Projects.js + .css   # Project grid + GitHub API repos
│   │   │   ├── Certifications.js    # Cert cards + education block
│   │   │   ├── Contact.js + .css    # Form with MongoDB API integration
│   │   │   └── Footer.js + .css     # Footer with links
│   │   ├── context/
│   │   │   └── ThemeContext.js      # Dark/Light mode context
│   │   ├── styles/
│   │   │   └── globals.css          # CSS variables, base styles
│   │   ├── App.js
│   │   └── index.js
│   ├── .env.example
│   └── package.json
│
├── backend/                         # Node.js + Express API
│   ├── models/
│   │   ├── Contact.js               # Contact form schema
│   │   ├── Project.js               # Project schema
│   │   └── Skill.js                 # Skill schema
│   ├── routes/
│   │   ├── contact.js               # POST /api/contact
│   │   ├── projects.js              # GET /api/projects
│   │   └── skills.js                # GET /api/skills
│   ├── server.js                    # Express app entry point
│   ├── .env.example
│   └── package.json
│
└── README.md
```

---

## ✨ Features

### Frontend
- ⚡ React.js 18 with functional components & hooks
- 🎨 CSS Variables for consistent theming
- 🌙 Dark / Light mode toggle (persisted in localStorage)
- 🎭 Framer Motion animations throughout
- ⌨️ React Type Animation in hero section
- 📱 Fully responsive (mobile-first)
- 🐙 GitHub API integration (live repositories)
- 🔡 Smooth scroll navigation
- 🔍 SEO optimized (meta tags, Open Graph)
- 🎯 Intersection Observer for scroll-triggered animations

### Backend
- 🛡️ Helmet.js security headers
- 🚦 Rate limiting (100 req/15min global, 5 req/hr contact)
- ✅ Express-validator input validation
- 🔒 CORS configured for frontend origin
- 📋 Auto-seeds MongoDB with initial project & skill data
- 🏥 Health check endpoint `/api/health`

### Database (MongoDB)
- 📨 Contact messages with timestamps and IP tracking
- 🗂️ Project documents with tech stack, highlights, categories
- 🛠️ Skills organized by category with proficiency percentages

---

## 🛠️ Installation

### Prerequisites
- Node.js 18+
- npm or yarn
- MongoDB Atlas account (free tier works)
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/Candy772004/vasanth-portfolio.git
cd vasanth-portfolio
```

### 2. Backend Setup
```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env`:
```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/vasanth_portfolio
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

Start backend:
```bash
npm run dev      # Development (nodemon)
# or
npm start        # Production
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
cp .env.example .env
```

Edit `.env`:
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_GITHUB_USERNAME=Candy772004
```

Start frontend:
```bash
npm start        # Runs on http://localhost:3000
```

### 4. Build for Production
```bash
cd frontend
npm run build    # Creates optimized build in /build folder
```

---

## 🗄️ MongoDB Atlas Setup

1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas) → Create free account
2. Create a **Free Cluster** (M0)
3. Go to **Database Access** → Add user with read/write permissions
4. Go to **Network Access** → Add IP `0.0.0.0/0` (all IPs for deployment)
5. Go to **Clusters** → **Connect** → **Connect your application**
6. Copy the connection string and paste into `MONGODB_URI` in `.env`

### Collections Created Automatically:
- `contacts` — Contact form submissions
- `projects` — Portfolio projects (auto-seeded)
- `skills` — Technical skills (auto-seeded)

---

## 🚀 Deployment Guide

### 🔵 Frontend → Vercel

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com) → **New Project**
3. Import your repository
4. Set **Root Directory** to `frontend`
5. Add Environment Variables:
   ```
   REACT_APP_API_URL=https://your-backend.onrender.com/api
   REACT_APP_GITHUB_USERNAME=Candy772004
   ```
6. Deploy → Get URL like `https://vasanthakumar.vercel.app`

### 🟣 Backend → Render

1. Go to [render.com](https://render.com) → **New Web Service**
2. Connect your GitHub repo
3. Configure:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. Add Environment Variables:
   ```
   MONGODB_URI=mongodb+srv://...
   FRONTEND_URL=https://vasanthakumar.vercel.app
   NODE_ENV=production
   ```
5. Deploy → Get URL like `https://vasanth-api.onrender.com`

### 🌿 Database → MongoDB Atlas
*(Already covered in the Setup section above)*

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/health` | Health check |
| `POST` | `/api/contact` | Submit contact form |
| `GET` | `/api/contact` | Get all messages |
| `GET` | `/api/projects` | Get all projects |
| `GET` | `/api/projects/featured` | Get featured projects |
| `GET` | `/api/skills` | Get all skills |

### Contact Form Validation Rules:
- `name`: 2–50 characters, required
- `email`: Valid email format, required
- `subject`: 3–100 characters, required
- `message`: 10–1000 characters, required
- Rate limited: 5 submissions per hour per IP

---

## 🎨 Customization

### Change Colors
Edit `frontend/src/styles/globals.css`:
```css
:root[data-theme="dark"] {
  --accent: #00d4ff;       /* Primary accent color */
  --accent-2: #7c3aed;     /* Secondary accent */
}
```

### Add a Project
Edit `backend/routes/projects.js`, add to `defaultProjects` array:
```javascript
{
  title: 'My New Project',
  description: 'What it does...',
  techStack: ['React', 'Node.js'],
  category: 'Full Stack',  // 'AI/ML' | 'Full Stack' | 'Backend' | 'Frontend'
  githubUrl: 'https://github.com/...',
  highlights: ['Feature 1', 'Feature 2'],
  featured: true,
  order: 6
}
```

### Update Resume
Place your resume PDF at:
```
frontend/public/Vasanthakumar_Resume.pdf
```

---

## 🔧 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js 18, Framer Motion, React Icons |
| Styling | Pure CSS with CSS Variables (no Tailwind dependency) |
| Backend | Node.js, Express.js |
| Database | MongoDB with Mongoose ODM |
| Security | Helmet.js, express-rate-limit, express-validator |
| Deployment | Vercel (FE), Render (BE), MongoDB Atlas (DB) |

---

## 📄 License

MIT License — © 2025 Vasanthakumar R
