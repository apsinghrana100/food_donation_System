import { DATE, Op, Sequelize } from "sequelize";
import AddressModule from "../module/addressModule.js";
import ConnectionSequelize from "../utils/connection.js"; // Your DB connection instance
import DonationPost from "../module/donatationModule.js";
import s3 from "../servives/wasabiConfig.js";
import User from "../module/userModule.js";
import PostPickupModule from "../module/postPickupDetailModule.js";
import axios from "axios";

export const createAddressAndDonationPost = async (req, res) => {
  const {
    food_title,
    food_expire_date,
    address_line,
    address_line2,
    pincode,
    food_type,
  } = req.body;

  let errors = {};

  // Check for required fields
  if (!food_title || food_title.trim() === "") {
    errors.food_title = "Food Title is required";
  }

  if (!food_expire_date || food_expire_date.trim() === "") {
    errors.food_expire_date = "Food expiry date is required";
  }

  if (!address_line || address_line.trim() === "") {
    errors.address_line = "Address Line 1 is required";
  }

  if (!address_line2 || address_line2.trim() === "") {
    errors.address_line2 = "Address Line 2 is required";
  }

  if (!pincode || pincode.trim() === "") {
    errors.pincode = "Pincode is required";
  } else if (!/^\d{6}$/.test(pincode)) {
    // Assuming Indian 6-digit pincode
    errors.pincode = "Pincode must be 6 digits";
  }

  if (!food_type || food_type.trim() === "") {
    errors.food_type = "Food type is required";
  }

  // If there are any errors, return them
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      success: false,
      errors: errors,
    });
  }

  const file = req.file;
  if (!file) return res.status(400).json({ error: "No file uploaded" });
  const output = axios.get(
    `https://api.postalpincode.in/pincode/${pincode.trim()}`
  );
  if (output.Status === "Error")
    return res.status(400).json({ msg: "Invalid Pincode" });

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

  console.log("Upload result", donwloadImagUrl);
  console.log("data checking", req.body, file);

  // Function to validate pincode (must be exactly 6 digits)
  const isValidPincode = (pincode) => /^\d{6}$/.test(pincode);
  if (!isValidPincode(pincode)) {
    return res.status(400).json({
      msg: "Pincode must be exactly 6 digits and contain only numbers (0-9).",
    });
  }

  // Start a transaction
  const transaction = await ConnectionSequelize.transaction();

  try {
    // Insert Address into AddressModule
    const newAddress = await AddressModule.create(
      { address_line, address_line2, pincode: Number(pincode) },
      { transaction }
    );

    // Insert DonationPost using the generated address_id
    const newDonationPost = await DonationPost.create(
      {
        user_id: req.subid,
        food_title,
        food_type,
        address_id: newAddress.addressId, // Get the newly created address ID
        food_image_url: donwloadImagUrl || file.originalname,
        foodExpiryTime: food_expire_date,
      },
      { transaction }
    );

    // Commit transaction if everything succeeds
    await transaction.commit();
    res.status(201).json({
      msg: "Donation post created successfully",
      data: newDonationPost,
      status: "Success",
    });
  } catch (error) {
    // Rollback transaction on failure
    await transaction.rollback();
    console.error("Transaction Failed:", error);
    res
      .status(500)
      .json({ msg: "Transaction failed: " + error.message, status: "fail" });
  }
};

export const FetchPostData = async (req, res) => {
  
  const { limit, pageNumber } = req.params;

  if (!req.subid) {
    return res.status(400).json({
      success: false,
      message: "Missing required parameter: userId",
    });
  }

  console.log("limit, pagenumber", limit, pageNumber);
  try {
    const response = await DonationPost.findAll({
      where: { user_id: { [Op.notIn]: [req.subid] } },
      include: [
        {
          model: AddressModule,
          attributes: [
            "address_line",
            "address_line2",
            "pincode",
            "longitude",
            "latitude",
          ],
          required: true,
        },
        {
          model: User,
          attributes: ["firstName", "userName", "emailAddress", "imageUrl"],
          required: true,
        },
      ],
      offset: pageNumber * limit,
      limit: limit,
    });

    res.status(200).json({
      msg: "Successfull fetched: ",
      data: response,
      status: "Success",
    });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Fetched fail: " + error.message, status: "fail" });
  }
};

export const getPickedPostDetails = async (req, res) => {
  try {
    const { limit, pageNumber } = req.params;

    if (!req.subid) {
      return res.status(400).json({
        success: false,
        message: "Missing required parameter: userId",
      });
    }

    const pickups = await PostPickupModule.findAll({
      where: {
        userId: req.subid, // Filter pickups by userId
      },
      attributes: [
        "postpickupId",
        "pickupStatus",
        "pickupDateTime",
        "pickedUpAt",
      ],
      include: [
        {
          model: User,
          as: "userDetail",
          attributes: [
            "userId",
            "firstName",
            "userName",
            "imageUrl",
            "emailAddress",
          ],
        },
        {
          model: DonationPost,
          as: "donationPost",
          attributes: [
            "post_id",
            "food_title",
            "food_type",
            "food_image_url",
            "foodExpiryTime",
            "status",
          ],
          include: [
            {
              model: User,
              attributes: ["userId", "firstName", "userName", "emailAddress"],
            },
            {
              model: AddressModule,
              attributes: [
                "addressId",
                "address_line",
                "pincode",
                "longitude",
                "latitude",
              ],
            },
          ],
        },
      ],
      offset: limit * pageNumber,
      limit: limit,
    });

    if (!pickups || pickups.length === 0) {
      return res.status(201).json({
        success: false,
        message: "Not picked any post",
        data: [],
      });
    }

    return res.status(200).json({
      success: true,
      message: "Picked post details fetched successfully",
      data: pickups,
    });
  } catch (error) {
    console.error("Error fetching post pickup details:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while fetching pickup details",
      error: error.message,
    });
  }
};

export const deletePost = async (req, res) => {
  try {
    const postDeleteId = req.params.id;
    console.log("postdeleteidL", postDeleteId);

    const deletedItem = await DonationPost.destroy({
      where: { post_id: postDeleteId },
    });

    if (!deletedItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json({ message: "Deleted successfully" }); // No content response
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const FetchPostDataById = async (req, res) => {
  try {
    const { status } = req.query;
    const { limit, pageNumber } = req.params;

    if (!req.subid) {
      return res.status(400).json({
        success: false,
        message: "Missing required parameter: userId",
      });
    }
    
    const response = await DonationPost.findAll({
      where: status
        ? { [Op.and]: [{ user_id: req.subid }, { status: "available" }] }
        : { user_id: req.subid },
      include: [
        {
          model: AddressModule,
          attributes: [
            "address_line",
            "address_line2",
            "pincode",
            "longitude",
            "latitude",
          ],
          required: true,
        },
        {
          model: User,
          attributes: ["firstName", "userName", "emailAddress"],
          required: true,
        },
      ],
      offset: limit * pageNumber,
      limit: limit,
    });

    res.status(200).json({
      msg: "Successfull fetched: ",
      data: response,
      status: "Success",
    });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Fetched fail: " + error.message, status: "fail" });
  }
};

// export default createAddressAndDonationPost;
