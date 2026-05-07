const db = require('./db');
const bcrypt = require('bcrypt');

const User = {

  create: async (username, password, role) => {
    const hash = await bcrypt.hash(password, 10);
    return new Promise((resolve, reject) => {
      db.run('INSERT INTO users (username, password, role) VALUES (?, ?, ?)', [username, hash, role], function(err) {
        if (err) reject(err);
        else resolve({ id: this.lastID, username, role });
      });
    });
  },
  
  findByUsername: (username) => new Promise((resolve, reject) => {
    db.get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
      if (err) reject(err); else resolve(row);
    });
  }),

  findById: (id) => new Promise((resolve, reject) => {
    db.get('SELECT * FROM users WHERE id = ?', [id], (err, row) => {
      if (err) reject(err); else resolve(row);
    });
  })
};

module.exports = User;
