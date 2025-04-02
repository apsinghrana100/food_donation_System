import SibApiV3Sdk from 'sib-api-v3-sdk'
import dotenv from "dotenv";
dotenv.config();

const SendOtpEmail = async(otp,recevierEmail,recevierName, donername, doneremail) => {
    // var SibApiV3Sdk = require("sib-api-v3-sdk");
    var defaultClient = SibApiV3Sdk.ApiClient.instance;
  
    var apiKey = defaultClient.authentications["api-key"];
    apiKey.apiKey = process.env.SENDI_BLUE_API_KEY;
    var apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
  
    var sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
  
    sendSmtpEmail.sender = { name: "food donation", email: "apsinghrana100@gmail.com" };
    sendSmtpEmail.to = [
      { email: doneremail , name:donername}
    ];
    sendSmtpEmail.subject = "Food Donation OTP ";
    // const otp = 123456; // Your generated OTP

    sendSmtpEmail.htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Your Food Collection OTP</title>
    </head>
    <body style="font-family: Arial, sans-serif; background-color: #f6f6f6; margin: 0; padding: 0;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="background-color: #ffffff; margin-top: 30px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
        <tr>
          <td align="center" style="padding: 20px 0; background-color: #4CAF50; color: #ffffff; border-top-left-radius: 10px; border-top-right-radius: 10px;">
            <h1>Food Donation</h1>
          </td>
        </tr>
        <tr>
          <td style="padding: 30px;">
            <h2 style="color: #333333;">Hello,</h2>
            <p style="color: #555555; font-size: 16px;">
              Thank you for your generous food donation! To ensure that the food is collected securely, please share the following OTP (One-Time Password) with the person who comes to collect the food.
            </p>
            <div style="text-align: center; margin: 30px 0;">
              <p style="font-size: 18px; color: #333333;">Your OTP Code:</p>
              <div style="display: inline-block; padding: 15px 25px; background-color: #4CAF50; color: #ffffff; font-size: 24px; font-weight: bold; letter-spacing: 2px; border-radius: 5px;">
                ${otp}
              </div>
            </div>
            <p style="color: #555555; font-size: 14px;">
              Please do not share this OTP with anyone else. Only provide it <h5>${recevierName} </h5> to the authorized food collector.
            </p>
            <p style="color: #555555; font-size: 14px;">
              If you have any questions or concerns, feel free to contact our support team.
            </p>
            <p style="color: #333333; font-size: 16px;">Thank you for making a difference!</p>
            <p style="color: #333333; font-size: 16px;">- The Food Donation Team</p>
          </td>
        </tr>
        <tr>
          <td align="center" style="padding: 20px; background-color: #f1f1f1; color: #888888; font-size: 12px; border-bottom-left-radius: 10px; border-bottom-right-radius: 10px;">
            &copy; 2025 Food Donation. All rights reserved.
          </td>
        </tr>
      </table>
    </body>
    </html>
    `;
    
  
    apiInstance.sendTransacEmail(sendSmtpEmail).then(
      function (data) {
        console.log("✅ Email sent successfully:", data);
        return true;
      },
      function (error) {
        console.error("❌ Error sending email:", error);
      }
    );
  };

  export default SendOtpEmail;