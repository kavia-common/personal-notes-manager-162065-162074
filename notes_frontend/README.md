# Notes Frontend (React)

Modern, minimalistic, responsive UI for the Notes app.

## Features
- User authentication (login/register) with JWT stored in localStorage
- Notes list, search, create, edit, delete
- Top navbar (search, profile/logout), sidebar (folders), main editor
- Light theme using palette: primary #1976d2, secondary #424242, accent #fbc02d
- Zero heavy UI frameworks; pure React + CSS

## Setup
1. Copy environment file and set backend URL:
   cp .env.example .env
   # Edit .env and set REACT_APP_API_URL to your FastAPI backend (e.g., http://localhost:3001)

2. Install dependencies and run:
   npm install
   npm start

3. Build for production:
   npm run build

## Notes
- Routing is hash-based (#/login, #/register, #/notes) to avoid extra dependencies.
- Required backend endpoints:
  - POST /auth/register -> { access_token }
  - POST /auth/login -> { access_token }
  - GET /auth/me -> { email, ... }
  - GET /notes[?q=]
  - GET /notes/:id
  - POST /notes
  - PUT /notes/:id
  - DELETE /notes/:id
  - Optional: GET /folders (otherwise folders are derived from notes)
