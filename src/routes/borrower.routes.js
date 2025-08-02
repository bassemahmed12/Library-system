const express = require('express');
const router = express.Router();
const borrowerController = require('../controllers/borrower.controller');

/**
 * @swagger
 * tags:
 *   name: Borrowers
 */

/**
 * @swagger
 * /api/borrowers:
 *   get:
 *     tags: [Borrowers]
 *     responses:
 *       200:
 *         description: List of borrowers
 */
router.get('/', borrowerController.getAllBorrowers);

/**
 * @swagger
 * /api/borrowers:
 *   post:
 *     tags: [Borrowers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: Borrower created
 */
router.post('/', borrowerController.createBorrower);

/**
 * @swagger
 * /api/borrowers/{id}:
 *   put:
 *     tags: [Borrowers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The borrower ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Borrower updated
 *       404:
 *         description: Borrower not found
 */
router.put('/:id', borrowerController.updateBorrower);

/**
 * @swagger
 * /api/borrowers/{id}:
 *   delete:
 *     tags: [Borrowers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The borrower ID
 *     responses:
 *       200:
 *         description: Borrower deleted
 *       404:
 *         description: Borrower not found
 */
router.delete('/:id', borrowerController.deleteBorrower);

module.exports = router;
