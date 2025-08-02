const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Book = require('./Book');
const Borrower = require('./Borrower');

const Borrowing = sequelize.define('Borrowing', {
  dueDate: { type: DataTypes.DATEONLY, allowNull: false },
  returned: { type: DataTypes.BOOLEAN, defaultValue: false }
});

Book.hasMany(Borrowing, { foreignKey: 'bookId' });
Borrowing.belongsTo(Book, { foreignKey: 'bookId' });

Borrower.hasMany(Borrowing, { foreignKey: 'borrowerId' });
Borrowing.belongsTo(Borrower, { foreignKey: 'borrowerId' });

module.exports = Borrowing;
