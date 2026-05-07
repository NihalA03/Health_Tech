const db = require('./db');

const Prescription = {
  
  create: (doctor_id, patient_id, medication, dosage, notes) => new Promise((resolve, reject) => {
    db.run(
      'INSERT INTO prescriptions (doctor_id, patient_id, medication, dosage, notes, created_at, updated_at) VALUES (?, ?, ?, ?, ?, datetime("now"), datetime("now"))',
      [doctor_id, patient_id, medication, dosage, notes],
      function (err) {
        if (err) reject(err);
        else resolve({ id: this.lastID, doctor_id, patient_id, medication, dosage, notes });
      }
    );
  }),
  
  update: (id, medication, dosage, notes) => new Promise((resolve, reject) => {
    db.run(
      'UPDATE prescriptions SET medication = ?, dosage = ?, notes = ?, updated_at = datetime("now") WHERE id = ?',
      [medication, dosage, notes, id],
      function (err) {
        if (err) reject(err);
        else resolve(this.changes);
      }
    );
  }),

  findByDoctor: (doctor_id) => new Promise((resolve, reject) => {
    db.all('SELECT * FROM prescriptions WHERE doctor_id = ?', [doctor_id], (err, rows) => {
      if (err) reject(err); else resolve(rows);
    });
  }),

  findByPatient: (patient_id) => new Promise((resolve, reject) => {
    db.all('SELECT * FROM prescriptions WHERE patient_id = ?', [patient_id], (err, rows) => {
      if (err) reject(err); else resolve(rows);
    });
  }),
  
  findById: (id) => new Promise((resolve, reject) => {
    db.get('SELECT * FROM prescriptions WHERE id = ?', [id], (err, row) => {
      if (err) reject(err); else resolve(row);
    });
  })
};

module.exports = Prescription;
