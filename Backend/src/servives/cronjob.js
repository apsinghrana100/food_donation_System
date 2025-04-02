import { Op } from "sequelize";
import DonationPost from "../module/donatationModule.js";
import cron from "node-cron";

cron.schedule("*/50 * * * *", async () => {
  try {
    console.log("Running cron job to check for expired products...");

    // Get current time
    const now = new Date();

    const [affectedCount] = await DonationPost.update(
      { status: "expired" },
      {
        where: {
        [Op.or]:[{status:'claimed',status:'available'}],// optional, if you only want to expire available posts
          foodExpiryTime: { [Op.lt]: now }, // expire if time is less than now
        },
      }
    );

    console.log(`Expired products updated: ${affectedCount}`);
  } catch (error) {
    console.error("Error in cron job:", error);
  }
});
