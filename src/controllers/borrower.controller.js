const Borrower = require('../models/Borrower');

exports.createBorrower = async (req, res) => {
  try {
    const borrower = await Borrower.create(req.body);
    res.status(201).json(borrower);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllBorrowers = async (req, res) => {
  try {
    const borrowers = await Borrower.findAll();
    res.json(borrowers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateBorrower = async (req, res) => {
  try {
    const [updated] = await Borrower.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ error: 'Borrower not found' });
    const updatedBorrower = await Borrower.findByPk(req.params.id);
    res.json(updatedBorrower);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteBorrower = async (req, res) => {
  try {
    const deleted = await Borrower.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ error: 'Borrower not found' });
    res.json({ message: 'Borrower deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
