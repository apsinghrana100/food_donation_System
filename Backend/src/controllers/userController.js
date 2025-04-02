import User from "../module/userModule.js";
import fetch from "node-fetch";
import cookieParser from "cookie-parser";
import JsonWebToken from "jsonwebtoken";
import dotenv from "dotenv";
import s3 from "../servives/wasabiConfig.js";
import DonationPost from "../module/donatationModule.js";
import ConnectionSequelize from "../utils/connection.js";
import { Op, Sequelize } from "sequelize";
dotenv.config();

export const UserRegistration = async (req, res) => {
  try {
    const { code } = req.query;
    if (!code) {
      return res.status(400).json({ error: "Authorization code is required." });
    }

    // Prepare data for token exchange
    const tokenData = {
      code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: process.env.GOOGLE_CALLBACK_URL,
      grant_type: "authorization_code",
    };

    console.log("Requesting access token...");

    // Exchange authorization code for access token
    const tokenResponse = await fetch(process.env.GOOGLE_ACCESS_TOKEN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tokenData),
    });

    if (!tokenResponse.ok) {
      throw new Error(`Failed to fetch tokens: ${tokenResponse.statusText}`);
    }

    const { access_token, refresh_token, id_token } =
      await tokenResponse.json();

    if (!id_token) {
      throw new Error("ID token not received.");
    }

    console.log("Decoding ID token...");
    const userInfo = JsonWebToken.decode(id_token);

    if (!userInfo) {
      throw new Error("Failed to decode user info.");
    }

    console.log("User Info:", userInfo);

    const { sub, name, picture, email } = userInfo;

    if (!sub || !email) {
      throw new Error("User info is incomplete.");
    }

    // Set refresh token in cookie
    res.cookie("refreshToken", refresh_token, {
      httpOnly: true,
      secure: false, // Change to `true` in production
      sameSite: "Lax",
    });

   

    // Find or create user in the database
    const [user, created] = await User.findOrCreate({
      where: { userId: sub },
      defaults: {
        userId: sub,
        firstName: name || "Unknown",
        userName: email.includes("@")
          ? email.split("@")[0] + Math.floor(10 + Math.random() * 9000)
          : email,
        imageUrl: picture,
        emailAddress: email,
      },
    });

    if (created) {
      console.log(`New user created: ${user.emailAddress}`);
    } else {
      console.log(`Existing user logged in: ${user.emailAddress}`);
    }

    // Create custom access token
    const customAccessToken = JsonWebToken.sign(
      {
        sub: user.userId,
        email: user.emailAddress,
        name: user.firstName,
        picture: user.imageUrl,
        username: user.userName,
      },
      "Accesskey",
      {
        expiresIn: "50m",
      }
    );

    // Redirect to frontend dashboard with access token
    res.redirect(
      `${process.env.FRONTED_URL}/landingpage/?accessToken=${customAccessToken}`
    );
    
  } catch (error) {
    console.error("Error in UserRegistration:", error.message);
    res.status(500).json({ error: error.message });
  }
};

export const UpdateUserProfileImage = async (req, res) => {
  try {
    const file = req.file;
    console.log("file name", file);
    const params = {
      Bucket: "fooddonation",
      Key: `${Date.now()}-${file.originalname}`,
      Body: file.buffer,
      ACL: "public-read",
      ContentType: file.mimetype,
    };

    const downloadparams = {
      Bucket: "fooddonation",
      Key: `${Date.now()}-${file.originalname}`,
      Expires: 60 * 60 * 24 * 365 * 100, // 100 years
    };

    const UploadResult = await s3.upload(params).promise();
    const donwloadImagUrl = await s3.getSignedUrlPromise(
      "getObject",
      downloadparams
    );

    console.log("imageurl:", req.subid);
    const UpdatedProfile = await User.update(
      { imageUrl: donwloadImagUrl },
      { where: { userId: req.subid } }
    );
    console.log(UpdatedProfile);

    return res
      .status(200)
      .json({ msg: "Profile updated Successfully!!", donwloadImagUrl });
  } catch (error) {
    return res
      .status(400)
      .json({ msg: "Error in Profile Updating!!", data: error.message });
  }
};

export const UpdateUserProfileData = async (req, res) => {
  const data = req.body;
  console.log(data);
  try {
    const output = await User.findOne({
      where:{ [Op.and]: [
      { userName: req.body.userName }, // Check for same username
      { userId: { [Op.ne]: req.subid } } // User ID should not be the same
    ]}
    });
    if(output) return res
    .status(409)
    .json({ msg: "User name alredy exits", success: false });


    const updateddata = await User.update(data, {
      where: { userId: req.subid },
    });
    console.log("updated data", updateddata);
    return res
      .status(200)
      .json({ msg: "Data updated Successfully", success: true });
  } catch (error) {
    return res
      .status(400)
      .json({ msg: "Data not updated", success: false, erorr: error.message });
  }
};

export const GetPostStaticsData = async (req, res) => {
  try {
    const userId = req.subid; // Or pass dynamically
    const [results] = await ConnectionSequelize.query(
      `SELECT
     COUNT(*) AS totalPosts,
     SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) AS successPosts,
     SUM(CASE WHEN status = 'expired' THEN 1 ELSE 0 END) AS expiredPosts
   FROM donation_posts
   WHERE user_id = :userId`,
      {
        replacements: { userId },
        type: Sequelize.QueryTypes.SELECT,
      }
    );

    console.log(results);

    return res
      .status(200)
      .json({ msg: "Fetched successfully", success: true, results });
  } catch (error) {
    return res
      .status(500)
      .json({
        msg: "something went wrong",
        success: false,
        error: error.message,
      });
  }
};
