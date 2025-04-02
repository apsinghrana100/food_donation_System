import { DataTypes } from "sequelize";
import ConnectionSequelize from "../utils/connection.js";
import User from "./userModule.js";
import DonationPost from "./donatationModule.js";

const PostPickupModule = ConnectionSequelize.define("PostPickupDetail", {
  postpickupId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.STRING,
    references: {
      model: User,
      key: "userId",
    },
    allowNull: false,
  },
  postId: {
    type: DataTypes.INTEGER,
    references: {
      model: DonationPost,
      key: "post_id",
    },
    allowNull: false,
  },
  pickupStatus: {
    type: DataTypes.ENUM("pending", "accepted", "picked_up", "cancelled"),
    allowNull: false,
    defaultValue: "pending",
  },
  pickupDateTime: {
    type: DataTypes.DATE,
    allowNull: true, // Set when the pickup is scheduled
  },
  pickedUpAt: {
    type: DataTypes.DATE,
    allowNull: true, // Set when the item is actually picked up
  },
  cancellationReason: {
    type: DataTypes.TEXT,
    allowNull: true, // If status is 'cancelled', store the reason
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

export default PostPickupModule;
