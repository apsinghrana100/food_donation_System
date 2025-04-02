import exprss from "express";
import multer from "multer";
import { GetPostStaticsData, UpdateUserProfileData, UpdateUserProfileImage } from "../controllers/userController.js";
import UserAuthenticationVerify from "../middleware/authMiddlware.auth.js";

const storage = multer.memoryStorage();
const upload = multer({storage:storage});

const userRouter = exprss.Router();

userRouter.get("/usertest", async (req, res) => {
  try {
        res.status(200).json({msg:"succesful"});
  } catch (error) {
    res.status(500).json({
      msg: "something went wrong",
      data: error.message,
    });
  }
});

userRouter.post("/updateProfileImage",UserAuthenticationVerify, upload.single('file'), UpdateUserProfileImage);

userRouter.patch("/updateProfileData",UserAuthenticationVerify, UpdateUserProfileData)
userRouter.get("/getPostStaticsData",UserAuthenticationVerify, GetPostStaticsData)


export default userRouter;
