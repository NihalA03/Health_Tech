require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const prescriptionRoutes = require('./routes/prescriptionRoutes');
const { authenticateJWT } = require('./middleware/authMiddleware');

const app = express();
app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/prescriptions', authenticateJWT, prescriptionRoutes);

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Server running on port ' + PORT);
});
