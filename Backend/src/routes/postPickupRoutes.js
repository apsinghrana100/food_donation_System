import express from "express";
import UserAuthenticationVerify from "../middleware/authMiddlware.auth.js";
import { getDonationPostById, PostPickupController, PostPickupVerifyByOtp } from "../controllers/postPickupDetailController.js";

const postPickUpRouter = express.Router();

/**
 * @swagger
 * /api/PostPickupUpdate:
 *   post:
 *     summary: Claim a Donation Post
 *     tags: [Post Pickup]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               postId:
 *                 type: integer
 *               donername:
 *                 type: string
 *               doneremail:
 *                 type: string
 *     responses:
 *       200:
 *         description: Donation Claimed Successfully
 *       500:
 *         description: Something went wrong
 */
postPickUpRouter.post('/PostPickupUpdate', UserAuthenticationVerify, PostPickupController);

/**
 * @swagger
 * /api/donation-posts/{postId}:
 *   get:
 *     summary: Get Donation Post by ID
 *     tags: [Post Pickup]
 *     parameters:
 *       - name: postId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully fetched donation post
 *       404:
 *         description: No Donation Post found with the provided ID
 *       500:
 *         description: Server error
 */
postPickUpRouter.get('/donation-posts/:postId', getDonationPostById);

/**
 * @swagger
 * /api/productVerify:
 *   post:
 *     summary: Verify OTP for Donation Pickup
 *     tags: [Post Pickup]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               postId:
 *                 type: integer
 *               otp:
 *                 type: integer
 *     responses:
 *       200:
 *         description: OTP matched successfully
 *       500:
 *         description: Wrong OTP or server error
 */
postPickUpRouter.post('/productVerify', UserAuthenticationVerify, PostPickupVerifyByOtp);

export default postPickUpRouter;
