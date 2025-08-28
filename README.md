# Script-Arena 🚀

An interactive MERN platform where you **learn**, **practice**, and **compete**—combining a LeetCode-style coding arena, a guided Learning-Path LMS, and an integrated AI assistant.

> Modern UI, secure auth, real-time code execution (Judge0), and Gemini-powered tutoring.

---

## 📑 Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Installation](#installation)
- [Configuration (env)](#configuration-env)
- [Seeding Sample Data](#seeding-sample-data)
- [Running the App](#running-the-app)
- [Usage](#usage)
- [Screenshots](#screenshots)
- [Examples](#examples)
- [Troubleshooting](#troubleshooting)
- [Roadmap / Future Work](#roadmap--future-work)
- [Contributors](#contributors)
- [License](#license)

---

## ✨ Features
- **Interactive Landing** – modern hero section, smooth scrolling.
- **Auth + OTP** – email OTP sign-up, JWT sessions, bcrypt hashing.
- **Guest Mode** – explore without an account.
- **LeetCode-style Problems** – split view (statement + Ace Editor).
- **Real-time Code Execution** – Judge0 API; 15+ languages; instant feedback.
- **Structured Learning Paths (LMS)** – Google Cloud Skills Boost–style tracks with modules & lessons.
- **Inline Quizzes** – check understanding in each lesson.
- **Linked Coding Assessments** – lessons point to relevant problems.
- **AI Assistant (Gemini)** – hints, code explanations, debugging help, and test-case generation.
- **Profile & Stats** – progress, solved count, submissions; heatmap planned.

---

## 🛠 Tech Stack
**Frontend:** React, React Router, Tailwind CSS (CDN), Ace Editor  
**Backend:** Node.js, Express.js  
**DB:** MongoDB + Mongoose  
**Auth:** JWT, bcryptjs  
**Code Runner:** Judge0 API  
**AI:** Google Gemini API  
**Realtime (planned):** Socket.io  

---

## 🏗 Architecture
script-arena/
├─ client/ # React app (Tailwind via CDN, Ace Editor)
├─ server/ # Express API, auth, LMS & problems services
│ ├─ models/ # Mongoose schemas
│ ├─ routes/ # REST endpoints
│ ├─ controllers/ # business logic
│ ├─ seeds/ # initial questions/paths
│ └─ .env # server configuration (see below)
└─ docs/
└─ screenshots/ # images used in README


---

## ⚙️ Installation

### Prerequisites
- Node.js (LTS) & npm  
- MongoDB (local) **or** MongoDB Atlas connection string  
- Credentials/keys for **Judge0** and **Google Gemini**

### 1) Clone
```bash
git clone https://github.com/your-username/script-arena.git
cd script-arena
2) Backend
cd server
npm install
# create .env (see next section)

3) Frontend
cd ../client
npm install

🔑 Configuration (env)

Create server/.env:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

# Email (for OTP)
EMAIL_HOST=your_smtp_host
EMAIL_PORT=587
EMAIL_USER=your_smtp_user
EMAIL_PASS=your_smtp_password

# Judge0 (RapidAPI)
JUDGE0_API_URL="https://judge0-ce.p.rapidapi.com"
X_RAPIDAPI_KEY="your_rapidapi_key"
X_RAPIDAPI_HOST="judge0-ce.p.rapidapi.com"

# Google Gemini
GEMINI_API_KEY="your_gemini_api_key"


Security: Never commit .env. Use environment secrets in CI/CD.

🌱 Seeding Sample Data

Populate the DB with initial coding questions (ensure the backend is not running):

# from /server
npm run seed

▶️ Running the App

Use two terminals:

Terminal A (backend):

cd server
npm run dev


Terminal B (frontend):

cd client
npm start


App runs at http://localhost:3000.

📖 Usage

Problems: Choose a problem → pick a language → write code in Ace Editor → Run & Submit (executes via Judge0).

Learning Paths: Enroll in a path → complete lessons & quizzes → attempt linked assessments.

AI Assistant: Ask for hints, explanations, debugging, or additional test cases.

Profile: Track solved count, attempts, and path progress.

🖼 Screenshots
| Landing Page                                                   | Why Script Arena?                                              |
| -------------------------------------------------------------- | -------------------------------------------------------------- |
| <img src="docs/screenshots/Screenshot (11).png" width="600" /> | <img src="docs/screenshots/Screenshot (12).png" width="600" /> |
| Dashboard                                                      | Profile Page                                                   |
| -------------------------------------------------------------- | -------------------------------------------------------------- |
| <img src="docs/screenshots/Screenshot (13).png" width="600" /> | <img src="docs/screenshots/Screenshot (14).png" width="600" /> |
| Problems (Two Sum)                                             | Problems (Valid Parentheses)                                   |
| -------------------------------------------------------------- | -------------------------------------------------------------- |
| <img src="docs/screenshots/Screenshot (15).png" width="600" /> | <img src="docs/screenshots/Screenshot (16).png" width="600" /> |
| Learning Paths                                                 | README Preview                                                 |
| -------------------------------------------------------------- | -------------------------------------------------------------- |
| <img src="docs/screenshots/Screenshot (17).png" width="600" /> | <img src="docs/screenshots/Screenshot (18).png" width="600" /> |

💻 Examples
Example: Two Sum (JS)
function twoSum(nums, target) {
  const map = new Map(); // value -> index
  for (let i = 0; i < nums.length; i++) {
    const need = target - nums[i];
    if (map.has(need)) return [map.get(need), i];
    map.set(nums[i], i);
  }
  return [];
}

Example: Valid Parentheses (JS)
function isValid(s) {
  const pairs = {')':'(', ']':'[', '}':'{'};
  const st = [];
  for (const ch of s) {
    if (ch in pairs) {
      if (st.pop() !== pairs[ch]) return false;
    } else {
      st.push(ch);
    }
  }
  return st.length === 0;
}

🐞 Troubleshooting

Screenshots not visible on GitHub
Ensure images are committed to the repo and the README paths point to those files (e.g., docs/screenshots/...).

Judge0 errors / 429
Check X_RAPIDAPI_KEY, confirm quota, and ensure JUDGE0_API_URL matches the correct CE endpoint.

MongoDB connection failed
Verify MONGO_URI and IP allowlist (Atlas) or that local MongoDB is running.

OTP not received
Confirm SMTP creds; try a provider-specific app password; check spam.

Invalid JWT / 401
Make sure client uses the latest token and that JWT_SECRET is identical across environments.

🚀 Roadmap / Future Work

Contests with real-time leaderboards (Socket.io).

GitHub-style activity heatmap on Profile.

Persist and visualize detailed learning progress.

Expand LMS with more paths and video content.

👨‍💻 Contributors

Your Name (@your-username) – creator & maintainer
(Feel free to open PRs—issues are welcome!)

📜 License
MIT © 2025 Ambrish Mishra
github: ambrishmishra847




