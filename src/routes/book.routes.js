const express = require('express');
const router = express.Router();
const bookController = require('../controllers/book.controller');
const rateLimiter = require('../middleware/rateLimiter');
/**
 * @swagger
 * tags:
 *   name: Books
 */

/**
 * @swagger
 * /api/books:
 *   get:
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: List of books
 */
router.get('/', rateLimiter,bookController.getAllBooks);

/**
 * @swagger
 * /api/books/search:
 *   get:
 *     tags: [Books]
 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         required: false
 *         description: Filter by title
 *       - in: query
 *         name: author
 *         schema:
 *           type: string
 *         required: false
 *         description: Filter by author
 *       - in: query
 *         name: isbn
 *         schema:
 *           type: string
 *         required: false
 *         description: Filter by ISBN
 *     responses:
 *       200:
 *         description: List of matching books
 */
router.get('/search', bookController.searchBooks);

/**
 * @swagger
 * /api/books/{id}:
 *   get:
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The book ID
 *     responses:
 *       200:
 *         description: Book data
 *       404:
 *         description: Book not found
 */
router.get('/:id', bookController.getBookById);

/**
 * @swagger
 * /api/books:
 *   post:
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               isbn:
 *                 type: string
 *               availableQuantity:
 *                 type: integer
 *               shelfLocation:
 *                 type: string
 *     responses:
 *       201:
 *         description: Book created
 */
router.post('/', rateLimiter,bookController.createBook);

/**
 * @swagger
 * /api/books/{id}:
 *   put:
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The book ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               isbn:
 *                 type: string
 *               availableQuantity:
 *                 type: integer
 *               shelfLocation:
 *                 type: string
 *     responses:
 *       200:
 *         description: Book updated
 *       404:
 *         description: Book not found
 */
router.put('/:id', bookController.updateBook);

/**
 * @swagger
 * /api/books/{id}:
 *   delete:
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The book ID
 *     responses:
 *       200:
 *         description: Book deleted
 *       404:
 *         description: Book not found
 */
router.delete('/:id', bookController.deleteBook);

module.exports = router;
