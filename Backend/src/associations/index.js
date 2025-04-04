import User from "../module/userModule.js";
import AddressModule from "../module/addressModule.js";
import DonationPost from "../module/donatationModule.js";
import PostPickupModule from "../module/postPickupDetailModule.js";
import OtpModule from "../module/otpModule.js";

// User & DonationPost
User.hasMany(DonationPost, { foreignKey: "user_id" });
DonationPost.belongsTo(User, { foreignKey: "user_id" });

// AddressModule & DonationPost
AddressModule.hasMany(DonationPost, { foreignKey: "address_id" });
DonationPost.belongsTo(AddressModule, { foreignKey: "address_id" });

// User & PostPickupModule
User.hasMany(PostPickupModule, { foreignKey: "userId" });
PostPickupModule.belongsTo(User, { foreignKey: "userId", as: "userDetail" });

// DonationPost & PostPickupModule
DonationPost.hasMany(PostPickupModule, { foreignKey: "postId", as: "postPickupDetails" });
PostPickupModule.belongsTo(DonationPost, { foreignKey: "postId", as: "donationPost" });

// User & OtpModule
User.hasOne(OtpModule, { foreignKey: "recevierId" });
OtpModule.belongsTo(User, { foreignKey: "recevierId" });

// DonationPost & OtpModule
DonationPost.hasOne(OtpModule, { foreignKey: "postId" });
OtpModule.belongsTo(DonationPost, { foreignKey: "postId" });

export default function initializeAssociations() {
  console.log("✅ Associations initialized successfully.");
}
