import express from "express";
import "dotenv/config";
import ConnectionSequelize from "./src/utils/connection.js";
import User from "./src/module/userModule.js";
import AddressModule from "./src/module/addressModule.js";
import FoodType from "./src/module/foodtypeModule.js";
import DonationPost from "./src/module/donatationModule.js";
import OtpModule from "./src/module/otpModule.js"
// var bodyParser = require('body-parser')
import bodyParser from "body-parser";
import './src/servives/cronjob.js';
import path from 'path';
import { fileURLToPath } from 'url';
import swaggerDocs from "./src/utils/swagger.js";

import cors from "cors";

import session from "express-session";
import passport from "passport";
import dotenv from "dotenv";
// import "./src/config/passport.js"; // Import Passport config
import authRoutes from "./src/routes/authRoutes.js"; // Import Routes
import postRouter from "./src/routes/postRoutes.js"; 
import PostPickupModule from "./src/module/postPickupDetailModule.js";
import postPickUpRouter from "./src/routes/postPickupRoutes.js";
import userRouter from "./src/routes/user.route.js";



const app = express();


const PORT = process.env.PORT ?? 6000;
console.log(PORT);
app.use(
  cors({
    origin: ["http://localhost:3000", // Explicitly allow frontend origin
    "http://localhost:5000"],
    credentials: true, // Allow cookies to be sent
  })
);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json()); // ✅ This enables JSON body parsing
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'build')));


// Use Routes
app.use('/api',authRoutes);
app.use('/api',postRouter);
app.use('/api',postPickUpRouter);
app.use('/api',userRouter);

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });
// app.use(cors());

swaggerDocs(app, PORT);


User.hasMany(DonationPost, { foreignKey: "user_id" });
DonationPost.belongsTo(User, { foreignKey: "user_id" });

AddressModule.hasMany(DonationPost, { foreignKey: "address_id" });
DonationPost.belongsTo(AddressModule, { foreignKey: "address_id" });

// User & PostPickupModule
User.hasMany(PostPickupModule, { foreignKey: "userId" });
PostPickupModule.belongsTo(User, {
  foreignKey: "userId",
  as: "userDetail", // ✅ Matches the include alias
});

DonationPost.hasMany(PostPickupModule, {
  foreignKey: "postId",
  as: "postPickupDetails", // ✅ Matches the include alias
});
PostPickupModule.belongsTo(DonationPost, {
  foreignKey: "postId",
  as: "donationPost", // Optional for reverse querying
});

User.hasOne(OtpModule,{foreignKey:"recevierId"});
OtpModule.belongsTo(User,{foreignKey:"recevierId"});

DonationPost.hasOne(OtpModule,{foreignKey:"postId"});
OtpModule.belongsTo(DonationPost,{foreignKey:"postId"});


const main = async () => {
  try {
    // await ConnectionSequelize.authenticate();
    await ConnectionSequelize.sync({alter: true });
    
    app.listen(PORT, () => {
      console.log(`Server is running  on ${PORT}`);
    });
  } catch (error) {
    console.log(`Something went wrong ${error}`);
  }
};

main();