const Prescription = require('../models/prescription');


exports.createPrescription = async (req, res, next) => {
  try {
    const { patient_id, medication, dosage, notes } = req.body;
    if (!patient_id || !medication || !dosage) return res.status(400).json({ error: 'Missing required fields' });
    const prescription = await Prescription.create(req.user.id, patient_id, medication, dosage, notes || '');
    res.status(201).json({ message: 'Prescription created', prescription });
  } catch (err) { next(err); }
};

exports.updatePrescription = async (req, res, next) => {
  try {
    const { medication, dosage, notes } = req.body;
    const { id } = req.params;
    const prescription = await Prescription.findById(id);
    if (!prescription) return res.status(404).json({ error: 'Prescription not found' });
    if (prescription.doctor_id !== req.user.id) return res.status(403).json({ error: 'Forbidden' });
    await Prescription.update(id, medication, dosage, notes);
    res.json({ message: 'Prescription updated' });
  } catch (err) { next(err); }
};


exports.getPrescriptions = async (req, res, next) => {
  try {
    const prescriptions = req.user.role === 'doctor'
      ? await Prescription.findByDoctor(req.user.id)
      : await Prescription.findByPatient(req.user.id);
    res.json({ prescriptions });
  } catch (err) { next(err); }
};


exports.getPrescriptionById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const prescription = await Prescription.findById(id);
    if (!prescription) return res.status(404).json({ error: 'Prescription not found' });
    if ((req.user.role === 'doctor' && prescription.doctor_id !== req.user.id) ||
        (req.user.role === 'patient' && prescription.patient_id !== req.user.id)) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    res.json({ prescription });
  } catch (err) { next(err); }
};
