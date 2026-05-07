# HealthTech Prescription Management System

A backend-driven system using Node.js, Express.js, and SQLite3 following MVC architecture. Supports secure authentication and role-based authorization for doctors and patients.

## Features
- Doctor and Patient roles
- JWT authentication
- Doctors: create, update, view their prescriptions
- Patients: register, login, view their prescriptions
- Secure, role-based access
- SQLite3 database

## Getting Started

1. **Install dependencies:**
   ```
npm install
   ```
2. **Initialize the database:**
   ```
node init_db.cjs
   ```
3. **Start the server:**
   ```
npm start
   ```

## API Endpoints

### Auth
- `POST /auth/register` — Register as patient
- `POST /auth/login` — Login (doctor/patient)

### Prescriptions (JWT required)
- `GET /prescriptions` — Doctor: all created, Patient: all assigned
- `GET /prescriptions/:id` — View prescription details
- `POST /prescriptions` — Doctor only: create
- `PUT /prescriptions/:id` — Doctor only: update

## Default Doctor Account
- Username: `doctor1`
- Password: `password123`

## Environment
- Edit `.env` for secrets and port

---

**For demonstration/learning purposes. Not for production use.**
"# Healthtech-prescription-system" 
