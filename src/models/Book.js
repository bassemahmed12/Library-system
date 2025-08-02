const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Book = sequelize.define('Book', {
  title: { type: DataTypes.STRING, allowNull: false },
  author: { type: DataTypes.STRING, allowNull: false },
  isbn: { type: DataTypes.STRING, allowNull: false, unique: true },
  availableQuantity: { type: DataTypes.INTEGER, allowNull: false },
  shelfLocation: { type: DataTypes.STRING }
});

module.exports = Book;
