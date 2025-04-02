import { DataTypes, INTEGER } from "sequelize";
import ConnectionSequelize from "../utils/connection.js";
import DonationPost from "./donatationModule.js";
import User from "./userModule.js";

const OtpModule = ConnectionSequelize.define(
  "otpDetails",
  {
    otpId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    otp: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    postId: {
      type: DataTypes.INTEGER,
      references: {
        model: DonationPost,
        key: "post_id",
      },
    },
    recevierId: {
      type: DataTypes.STRING,
      references: {
        model: User,
        key: "userId",
      },
    },
    status:{
        type: DataTypes.STRING,
        defaultValue:"pending"
    }
  },
  {
    timestamps: true, // Sequelize will automatically manage createdAt and updatedAt fields
    tableName: "otpDetails", // Optional: You can specify a custom table name
  }
);

export default OtpModule;
