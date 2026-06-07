# School Examination Registration Portal

A mini full-stack school portal built for academic demonstration with React, Tailwind CSS, Node.js, Express, and MySQL.

## Features

- Student login with registration number and password
- Admin login with admin dashboard
- Student profile and fee status overview
- Admit card download when fees are paid
- Notice board with admin notice management
- Gallery with category previews and lightbox
- Responsive modern UI using Tailwind CSS

## Technology Stack

- Frontend: React, Vite, Tailwind CSS, React Router
- Backend: Node.js, Express
- Database: MySQL

## Project Structure

- `frontend/` - React application
- `backend/` - Express API server
- `database/` - MySQL schema and sample data scripts

## Setup Instructions

1. Install SQLite if not already installed.
2. Create the SQLite database file and tables using the script:

```bash
cd "d:\School Website 3\backend"
npm install
npm run init-db
```

3. No database credentials are required for SQLite.

4. Install backend dependencies:

```bash
cd backend
npm install
```

5. Install frontend dependencies:

```bash
cd ../frontend
npm install
```

6. Start the backend server:

```bash
cd ../backend
npm run dev
```

7. Start the frontend app:

```bash
cd ../frontend
npm run dev
```

8. Open the app in your browser at `http://localhost:5173`.

## Sample Credentials

- Student: `STU2026001` / `student123`
- Student: `STU2026002` / `student123`
- Admin: `admin` / `adminpass`

## Notes

- Admit card downloads are generated dynamically on the server using PDFKit.
- The frontend is configured to call `http://localhost:5000` for API requests.
- Tailwind CSS is used for a clean, responsive educational theme with blue, orange, and white styling.
