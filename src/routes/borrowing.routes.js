const express = require('express');
const router = express.Router();
const controller = require('../controllers/borrowing.controller');

/**
 * @swagger
 * tags:
 *   name: Borrowing
 */

/**
 * @swagger
 * /api/borrowings/checkout:
 *   post:
 *     tags: [Borrowing]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - borrowerId
 *               - bookId
 *               - dueDate
 *             properties:
 *               borrowerId:
 *                 type: integer
 *               bookId:
 *                 type: integer
 *               dueDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Book checked out
 */
router.post('/checkout', controller.checkoutBook);

/**
 * @swagger
 * /api/borrowings/return/{borrowingId}:
 *   patch:
 *     tags: [Borrowing]
 *     parameters:
 *       - in: path
 *         name: borrowingId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The borrowing record ID
 *     responses:
 *       200:
 *         description: Book returned
 *       400:
 *         description: Invalid borrowing record
 */
router.patch('/return/:borrowingId', controller.returnBook);

/**
 * @swagger
 * /api/borrowings/borrower/{borrowerId}:
 *   get:
 *     tags: [Borrowing]
 *     parameters:
 *       - in: path
 *         name: borrowerId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The borrower ID
 *     responses:
 *       200:
 *         description: List of currently borrowed books
 */
router.get('/borrower/:borrowerId', controller.getBorrowedBooks);

/**
 * @swagger
 * /api/borrowings/overdue:
 *   get:
 *     tags: [Borrowing]
 *     responses:
 *       200:
 *         description: List of overdue books
 */
router.get('/overdue', controller.getOverdueBooks);

/**
 * @swagger
 * /api/borrowings/report:
 *   get:
 *     tags: [Borrowing]
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         required: true
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         required: true
 *         description: Response format
 *     responses:
 *       200:
 *         description: Exported report
 */
router.get('/report', controller.getBorrowingReport);

/**
 * @swagger
 * /api/borrowings/export/overdue-last-month:
 *   get:
 *     tags: [Borrowing]
 *     responses:
 *       200:
 *         description: CSV file of overdue borrowings
 */
router.get('/export/overdue-last-month', controller.exportOverdueLastMonthCSV);

/**
 * @swagger
 * /api/borrowings/export/last-month:
 *   get:
 *     tags: [Borrowing]
 *     responses:
 *       200:
 *         description: CSV file of borrowings
 */
router.get('/export/last-month', controller.exportBorrowingsLastMonthCSV);

module.exports = router;
