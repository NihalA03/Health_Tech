const express = require('express');
const router = express.Router();
const { createPrescription, updatePrescription, getPrescriptions, getPrescriptionById } = require('../controllers/prescriptionController');
const { authorizeRole } = require('../middleware/roleMiddleware');

router.get('/', getPrescriptions);
router.get('/:id', getPrescriptionById);
router.post('/', authorizeRole('doctor'), createPrescription);
router.put('/:id', authorizeRole('doctor'), updatePrescription);

module.exports = router;
