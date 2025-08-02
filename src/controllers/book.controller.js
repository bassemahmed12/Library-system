const Book = require('../models/Book');
const { Op } = require('sequelize');

exports.createBook = async (req, res) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.findAll();
    if (!books || books.length === 0) {
      return res.status(404).json({ error: 'No books found' });
    }
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) return res.status(404).json({ error: 'Book not found' });
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const [updated] = await Book.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ error: 'Book not found' });
    const updatedBook = await Book.findByPk(req.params.id);
    res.json(updatedBook);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const deleted = await Book.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ error: 'Book not found' });
    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.searchBooks = async (req, res) => {
  try {
    const { title, author, isbn } = req.query;

    const conditions = [];
    if (title) conditions.push({ title: { [Op.like]: `%${title}%` } });
    if (author) conditions.push({ author: { [Op.like]: `%${author}%` } });
    if (isbn) conditions.push({ isbn: { [Op.like]: `%${isbn}%` } });

    if (conditions.length === 0) {
      return res.status(400).json({ error: 'At least one search parameter (title, author, isbn) is required' });
    }

    const books = await Book.findAll({
      where: {
        [Op.or]: conditions,
      },
    });

    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};