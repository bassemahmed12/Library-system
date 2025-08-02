const Borrowing = require('../models/Borrowing');
const Book = require('../models/Book');
const Borrower = require('../models/Borrower');
const { Op } = require('sequelize');
const { Parser } = require('json2csv');

exports.checkoutBook = async (req, res) => {
  try {
    const { borrowerId, bookId, dueDate } = req.body;
    const book = await Book.findByPk(bookId);
    if (!book || book.availableQuantity <= 0) {
      return res.status(400).json({ error: 'Book unavailable' });
    }

    await Borrowing.create({ borrowerId, bookId, dueDate });
    await Book.update({ availableQuantity: book.availableQuantity - 1 }, { where: { id: bookId } });

    res.status(201).json({ message: 'Book checked out' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.returnBook = async (req, res) => {
  try {
    const { borrowingId } = req.params;
    const borrowing = await Borrowing.findByPk(borrowingId);
    if (!borrowing || borrowing.returned) {
      return res.status(400).json({ error: 'Invalid borrowing record' });
    }

    borrowing.returned = true;
    await borrowing.save();

    await Book.increment('availableQuantity', { where: { id: borrowing.bookId } });

    res.json({ message: 'Book returned' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getBorrowedBooks = async (req, res) => {
  try {
    const { borrowerId } = req.params;
    const borrows = await Borrowing.findAll({
      where: { borrowerId, returned: false },
      include: Book,
    });
    res.json(borrows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getOverdueBooks = async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    const overdue = await Borrowing.findAll({
      where: { dueDate: { [Op.lt]: today }, returned: false },
      include: [Book, Borrower],
    });
    res.json(overdue);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getBorrowingReport = async (req, res) => {
  try {
    const { startDate, endDate, format } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({ error: 'startDate and endDate are required' });
    }

    const records = await Borrowing.findAll({
      where: {
        createdAt: {
          [Op.between]: [new Date(startDate), new Date(endDate)],
        },
      },
      include: [Book, Borrower],
    });

    const formattedData = records.map(r => ({
      borrower: r.Borrower.name,
      email: r.Borrower.email,
      book: r.Book.title,
      isbn: r.Book.isbn,
      borrowedOn: r.createdAt.toISOString().split('T')[0],
      dueDate: r.dueDate,
      returned: r.returned ? 'Yes' : 'No',
    }));

    const parser = new Parser();
    const csv = parser.parse(formattedData);
    res.header('Content-Type', 'text/csv');
    res.attachment('borrowing_report.csv');
    return res.send(csv);    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.exportOverdueLastMonthCSV = async (req, res) => {
  try {
    const today = new Date();
    const firstDayOfLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const lastDayOfLastMonth = new Date(today.getFullYear(), today.getMonth(), 0);

    const overdue = await Borrowing.findAll({
      where: {
        returned: false,
        dueDate: {
          [Op.lt]: today,
          [Op.between]: [firstDayOfLastMonth, lastDayOfLastMonth],
        },
      },
      include: [Book, Borrower],
    });

    const data = overdue.map((r) => ({
      borrower: r.Borrower.name,
      email: r.Borrower.email,
      book: r.Book.title,
      isbn: r.Book.isbn,
      dueDate: r.dueDate,
    }));

    if (!data.length) 
      {
        return res.status(404).json({ error: 'No data available to export' });
      }
    
    const parser = new Parser({ fields: Object.keys(data[0] || {}) });
    const csv = parser.parse(data);

    res.header('Content-Type', 'text/csv');
    res.attachment('overdue_last_month.csv');
    res.send(csv);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.exportBorrowingsLastMonthCSV = async (req, res) => {
  try {
    const today = new Date();
    const firstDayOfLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const lastDayOfLastMonth = new Date(today.getFullYear(), today.getMonth(), 0);

    const borrowings = await Borrowing.findAll({
      where: {
        createdAt: {
          [Op.between]: [firstDayOfLastMonth, lastDayOfLastMonth],
        },
      },
      include: [Book, Borrower],
    });
    
    const data = borrowings.map((r) => ({
      borrower: r.Borrower.name,
      email: r.Borrower.email,
      book: r.Book.title,
      isbn: r.Book.isbn,
      borrowedOn: r.createdAt.toISOString().split('T')[0],
      dueDate: r.dueDate,
      returned: r.returned ? 'Yes' : 'No',
    }));
    if (!data.length) 
      {
        return res.status(404).json({ error: 'No data available to export' });
      }

    const parser = new Parser({ fields: Object.keys(data[0] || {}) });
    const csv = parser.parse(data);

    res.header('Content-Type', 'text/csv');
    res.attachment('borrowings_last_month.csv');
    res.send(csv);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
