import { Sequelize, DataTypes } from 'sequelize';
import ConnectionSequelize from '../utils/connection.js'; // Replace with your actual database connection

const FoodType = ConnectionSequelize.define('FoodType', {
  food_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true, // This handles the auto increment, similar to IDENTITY(1, 1) in SQL
  },
  food_type: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
}, {
  tableName: 'food_types',  // Optionally specify the table name
  timestamps: false,        // Disable automatic timestamp fields (createdAt, updatedAt) if not needed
});

export default FoodType;