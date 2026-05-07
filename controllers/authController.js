const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');


exports.register = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ error: 'Username and password required' });
    if (await User.findByUsername(username)) return res.status(409).json({ error: 'Username already exists' });
    const user = await User.create(username, password, 'patient');
    res.status(201).json({ message: 'User registered', user });
  } catch (err) { next(err); }
};


exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ error: 'Username and password required' });
    const user = await User.findByUsername(username);
    if (!user || !(await bcrypt.compare(password, user.password))) return res.status(401).json({ error: 'Invalid credentials' });
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });
    res.json({ token, user: { id: user.id, username: user.username, role: user.role } });
  } catch (err) { next(err); }
};
