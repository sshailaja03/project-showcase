# DevLink 🚀

**DevLink** is a premium, "zero-gravity" portfolio platform designed for developers who want to showcase their work in a futuristic and interactive way.

## ✨ Features

- **Zero-Gravity UI:** Interactive 3D tilt cards that react to mouse movement with high-precision physics.
- **Dynamic Backgrounds:** Global mouse-tracking glow and floating ambient "blob" animations that persist across pages.
- **Secure Authentication:** Full JWT-based login and registration system for managing your personal showcase.
- **Project Dashboard:** Create, manage, and delete your portfolio projects with a streamlined interface.
- **Public Profiles:** Unique URLs for every developer (e.g., `/u/username`) to share their universe of code with the world.
- **Tech-Centric Design:** Scattered floating tech icons and security indicators for a modern, "safe space" developer vibe.

## 🛠️ Tech Stack

- **Frontend:** React, Vite, Tailwind CSS, Lucide React
- **Backend:** Node.js, Express, MongoDB
- **State Management:** React Context API
- **Animations:** CSS Keyframes & 3D Transform Utilities

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/sshailaja03/project-showcase.git
   cd project-showcase
   ```

2. **Set up Backend:**
   ```bash
   cd backend
   npm install
   ```
   *Create a `.env` file in the `backend` folder with your environment variables.*

3. **Set up Frontend:**
   ```bash
   cd ../frontend
   npm install
   ```

### Running Locally

To run the full-stack application, start both the backend and the frontend:

1. **Start Backend Server:**
   ```bash
   cd backend
   npm start
   ```
   *The API will run on `http://localhost:5000`*

2. **Start Frontend Dev Server:**
   ```bash
   cd frontend
   npm run dev
   ```
   *The application will be accessible at `http://localhost:5173`*

## 📁 Project Structure

```text
├── backend/            # Express server, Auth controllers, and DB models
├── frontend/           # React application, 3D components, and custom hooks
├── render.yaml         # Deployment configuration for Render.com
└── README.md           # Project documentation
```

## 📜 License

Distributed under the MIT License.

---
Built for developers, by developers.
