import { DATE } from "sequelize";
import PostPickupModule from "../module/postPickupDetailModule.js";
import DonationPost from "../module/donatationModule.js";
import ConnectionSequelize from "../utils/connection.js";

import AddressModule from "../module/addressModule.js";

import User from "../module/userModule.js";
import OtpModule from "../module/otpModule.js";
import SendOtpEmail from "../servives/otpPostmail.js";

export const PostPickupController = async (request, response) => {
  const transaction = await ConnectionSequelize.transaction();
  try {
    const { postId, donername, doneremail } = request.body;
    console.log("Postid", postId);

    // Step 1: Update DonationPost status to "claimed"
    await DonationPost.update(
      { status: "claimed" },
      {
        where: { post_id: postId },
        transaction,
      }
    );

    // Step 2: Create a new PostPickupModule record
    const output = await PostPickupModule.create(
      {
        userId: request.subid,
        postId,
        pickupStatus: "accepted",

        pickupDateTime: Date.now(),
      },
      { transaction }
    );

    //Step 3: Generate Otp and send mail with otp to doner and save otp in database.
    const generateFourDigitOTP = () => {
      return Math.floor(1000 + Math.random() * 9000);
    };

    const otpout = await OtpModule.create(
      {
        otp: Math.floor(1000 + Math.random() * 9000),
        postId: postId,
        recevierId: request.subid,
      },
      { transaction }
    );

    await SendOtpEmail(
      otpout.otp,
      request.email,
      request.name,
      donername,
      doneremail
    );
    // Commit the transaction if everything worked fine
    await transaction.commit();

    response.status(200).json({
      msg: "Donation Claimed Successfully!!",
      data: output,
    });
  } catch (error) {
    // Rollback transaction in case of any error
    await transaction.rollback();
    console.log(error);
    response.status(500).json({
      msg: "Something went wrong",
      Error: error.message || error,
    });
  }
};

// const donationPostId = 2;

export const getDonationPostById = async (req, res) => {
  const { postId } = req.params; // Get postId from request params

  try {
    const donationPost = await DonationPost.findOne({
      where: { post_id: postId },
      attributes: [
        "post_id",
        ["user_id", "post_owner_user_id"],
        "food_title",
        "food_type",
        "food_image_url",
        "foodExpiryTime",
        ["status", "post_status"],
        ["created_at", "post_created_at"],
        ["createdAt", "post_createdAt"],
        ["updatedAt", "post_updatedAt"],
      ],
      include: [
        {
          model: AddressModule,
          as: "address", // ✅ This should match your hasOne/belongsTo alias
          attributes: [
            "addressId",
            "address_line",
            "address_line2",
            "pincode",
            "longitude",
            "latitude",
          ],
        },
        {
          model: PostPickupModule,
          as: "postPickupDetails", // ✅ Use exact alias from association
          attributes: [
            "postpickupId",
            ["userId", "pickup_user_id"],
            "postId",
            "pickupDateTime",
            "pickupStatus",
            "pickedUpAt",
            "cancellationReason",
            ["createdAt", "pickup_createdAt"],
            ["updatedAt", "pickup_updatedAt"],
          ],
          include: [
            {
              model: User,
              as: "userDetail", // ✅ Ensure this matches the alias in belongsTo
              attributes: [
                "userId",
                "firstName",
                "userName",
                "imageUrl",
                "emailAddress",
                "profileDescription",
                ["createdAt", "user_createdAt"],
                ["updatedAt", "user_updatedAt"],
              ],
            },
          ],
        },
      ],
    });

    if (!donationPost) {
      return res.status(404).json({
        success: false,
        message: `No Donation Post found with ID ${postId}`,
      });
    }

    res.status(200).json({
      success: true,
      data: donationPost,
    });
  } catch (error) {
    console.error(`Error fetching donation post with ID ${postId}:`, error);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching the donation post.",
      error: error.message,
    });
  }
};

export const PostPickupVerifyByOtp = async (req, res) => {
  let { postId, otp } = req.body;

  // Parse them into integers
  postId = parseInt(postId, 10);
  otp = parseInt(otp, 10);

  const transaction = await ConnectionSequelize.transaction();
  try {
    const output = await OtpModule.findOne({
      where: { postId: postId, otp: otp, recevierId: req.subid },
    });
    console.log(output);
    if (output === null) {
      res.status(500).json({
        success: false,
        message: "wrong otp",
      });
    } else {
      //update the otp table status pending to complete
      await OtpModule.update(
        { status: "completed" },
        { where: { otpId: output.otpId } },
        { transaction }
      );

      //updating the record donationtable claimed to success

      await DonationPost.update(
        { status: "completed" },
        { where: { post_id: postId } },
        { transaction }
      );

      //update the record of pickuptable's status complete

      await PostPickupModule.update(
        { pickupStatus: "picked_up" },
        { where: { postId: postId, userId: req.subid } },
        { transaction }
      );

      res.status(200).json({
        success: true,
        message: "Otp matched",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "wrong otp",
      error: error.message,
    });
  }
};
