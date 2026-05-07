require('dotenv').config();
const db = require('./models/db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL CHECK(role IN ('doctor', 'patient'))
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS prescriptions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    doctor_id INTEGER NOT NULL,
    patient_id INTEGER NOT NULL,
    medication TEXT NOT NULL,
    dosage TEXT NOT NULL,
    notes TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    FOREIGN KEY (doctor_id) REFERENCES users(id),
    FOREIGN KEY (patient_id) REFERENCES users(id)
  )`);

  // Create a default doctor for testing
  const bcrypt = require('bcrypt');
  const defaultDoctor = 'doctor1';
  const defaultPassword = 'password123';
  const role = 'doctor';
  db.get('SELECT * FROM users WHERE username = ?', [defaultDoctor], async (err, row) => {
    if (!row) {
      const hash = await bcrypt.hash(defaultPassword, 10);
      db.run('INSERT INTO users (username, password, role) VALUES (?, ?, ?)', [defaultDoctor, hash, role]);
    }
  });
});

console.log('Database initialized.');
