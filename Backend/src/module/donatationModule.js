import { Sequelize, DataTypes, Model } from "sequelize";
import ConnectionSequelize from "../utils/connection.js";
import User from "./userModule.js";
import AddressModule from "./addressModule.js";
import FoodType from "./foodtypeModule.js";
// Replace with your actual database connection

const DonationPost = ConnectionSequelize.define(
  "DonationPost",
  {
    post_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true, // Equivalent to IDENTITY(1, 1)
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: User,
        key: "userId",
      },
    },
    food_title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    food_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: AddressModule,
        key: "addressId",
      },
    },
    food_image_url: {
      type: DataTypes.STRING(2048), // For storing long URLs
      allowNull: true, // This can be null if no image URL is provided
    },
    foodExpiryTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("available", "claimed", "completed", "expired"),
      allowNull: false,
      defaultValue: "available", // Default status when a post is created
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW, // Equivalent to GETDATE()
    },
  },
  {
    tableName: "donation_posts", // Optional: Specify the table name
    timestamps: true, // If you don't want automatic timestamp fields (createdAt, updatedAt)
  }
);

// 🔥 **Define Associations (Explicitly)**

export default DonationPost;
