# DevLink 🚀

> A full-stack developer portfolio platform with JWT authentication, project management, public developer profiles, and an interactive React interface.

## Overview

DevLink solves a simple problem: developers often have projects scattered across repositories, portfolios, and social profiles.

The application provides a single shareable profile where a developer can authenticate, manage projects, and publish a public portfolio through a unique URL.

The project combines **full-stack development, authentication, REST APIs, database modeling, and interactive frontend engineering** in one application.

## Core Features

- **JWT Authentication** — registration and login with protected routes
- **Project Dashboard** — create, update, and delete portfolio projects
- **Public Profiles** — shareable developer pages at `/u/:username`
- **Interactive UI** — 3D tilt cards, cursor-reactive effects, and animated backgrounds
- **Responsive Design** — portfolio experience across desktop and smaller screens
- **Secure Configuration** — environment-based secrets and backend configuration

## Architecture

```
┌──────────────────────────────┐
│        React Frontend        │
│                              │
│  Pages → Components → API    │
└──────────────┬───────────────┘
               │ HTTP / REST
               ▼
┌──────────────────────────────┐
│       Express Backend        │
│                              │
│ Routes → Middleware →        │
│ Controllers → Data Models    │
└──────────────┬───────────────┘
               │
               ▼
        ┌─────────────┐
        │   MongoDB   │
        └─────────────┘

Authentication flow:
Client → Login/Register → Express → JWT → Protected API routes
```

## Engineering Highlights

### Authentication & Authorization

DevLink uses JWT-based authentication to protect user-specific operations.

The general request flow is:

1. User registers or logs in.
2. Backend validates the request.
3. Server issues a JWT.
4. Client includes the token on protected requests.
5. Authentication middleware validates the token before allowing access.

### Project Management

Authenticated users can manage their own portfolio projects through REST endpoints.

This separates:

- UI state
- HTTP/API communication
- authentication middleware
- controller logic
- database persistence

### Public Profiles

Developers receive a unique profile route:

```text
/u/username
```

This allows the private dashboard and public portfolio experience to remain separate while using the same underlying project data.

### Interactive Frontend

The UI uses CSS transforms, animated backgrounds, cursor tracking, and reusable React components to create a more engaging portfolio experience without requiring a heavy 3D rendering engine.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite |
| Styling | Tailwind CSS |
| Icons | Lucide React |
| State | React Context API |
| Backend | Node.js, Express 5 |
| Database | MongoDB / Mongoose |
| Authentication | JWT, bcryptjs |
| HTTP Client | Axios |
| Deployment | Render |

## Project Structure

```text
project-showcase/
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
├── frontend/
│   └── src/
│       ├── components/
│       ├── pages/
│       └── ...
├── render.yaml
└── README.md
```

## Quality & CI

The repository includes CI checks for the full-stack build, helping catch frontend/backend build regressions before deployment.

### Current testing opportunity

The backend currently has room for a dedicated automated API test suite. High-value cases include:

- registration validation
- successful login
- invalid credentials
- protected-route authorization
- project CRUD operations
- unauthorized project access

This is intentionally listed as future engineering work rather than claiming tests that do not currently exist.

## Getting Started

### Prerequisites

- Node.js 18+
- npm
- MongoDB

### 1. Clone

```bash
git clone https://github.com/sshailaja03/project-showcase.git
cd project-showcase
```

### 2. Configure Backend

```bash
cd backend
npm install
cp .env.example .env
```

Set the required values in `.env`:

```env
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-secret>
FRONTEND_URL=<your-frontend-url>
```

Never commit real secrets.

### 3. Configure Frontend

```bash
cd ../frontend
npm install
```

### 4. Run Locally

Backend:

```bash
cd backend
npm start
```

Frontend:

```bash
cd frontend
npm run dev
```

The development servers use the ports configured by the project environment.

## What This Project Demonstrates

- Full-stack React + Node.js development
- REST API design
- JWT authentication and protected routes
- MongoDB data persistence
- Frontend state management
- Responsive component-based UI design
- Interactive CSS and animation techniques
- Environment-based configuration
- CI-based build verification

## Roadmap

- Add automated backend/API tests
- Add rate limiting and stronger request validation
- Add project search/filtering
- Add profile analytics
- Improve accessibility and keyboard navigation
- Add richer deployment monitoring

---

**Shailaja Singh** · Software Engineering Student · C++ · DSA · Full-Stack Development
