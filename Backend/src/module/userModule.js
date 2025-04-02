import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../utils/connection.js";  // Make sure `connection.js` exports a sequelize instance

const User = sequelize.define(
  "UserDetail",  // Model name should be singular by convention (this is fine though)
  {
    userId:{
        type:DataTypes.STRING,
        primaryKey:true,
      },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,  // It's usually a good practice to explicitly specify whether a field can be null or not
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,  // It's good to specify if a field is nullable
    },
    emailAddress: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    profileDescription: {
      type: DataTypes.STRING,
      allowNull: true,  // Make it nullable if the description is optional
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,  // It's a good idea to set a default value for booleans
    },
    emailNotificationEnable: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,  // Set default to `true` if notifications should be enabled by default
    }
  },
  {
    timestamps: true,  // Sequelize will automatically manage createdAt and updatedAt fields
    tableName: "user_details"  // Optional: You can specify a custom table name
  }
);


export default User;
