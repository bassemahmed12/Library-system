const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Borrower = sequelize.define('Borrower', {
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  registeredDate: { type: DataTypes.DATEONLY, defaultValue: DataTypes.NOW }
});

module.exports = Borrower;
