import exprss from "express";
import multer from "multer";
const postRouter = exprss.Router();
import s3 from "../servives/wasabiConfig.js";
import UserAuthicationVerify from "../middleware/authMiddlware.auth.js";
import {createAddressAndDonationPost, deletePost, FetchPostData, FetchPostDataById, getPickedPostDetails} from "../controllers/dontaionController.js";


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


postRouter.post('/upload',upload.single('file'), async(req, res)=>{
    try {
        const file = req.file;
        if(!file) return res.status(400).json({error:"No file uploaded"});

        const params = {
            Bucket:"fooddonation",
            Key:`${Date.now()}-${file.originalname}`,
            Body:file.buffer,
            ACL:'public-read', 
            ContentType:file.mimetype,
        };
        const UploadResult = await s3.upload(params).promise();
        res.json({ imageUrl: UploadResult.Location })

    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ error: 'Upload failed' });
    }
});

postRouter.get('/getfile/:filename', async (req, res) => {
    const fileName = req.params.filename;
    console.log("i am filegetting")

    const params = {
        Bucket: "fooddonation",
        Key: fileName,
        Expires: 60 * 60 * 24 * 365 * 100 // 100 years
    };

    try {
        const url = await s3.getSignedUrlPromise("getObject", params);
        res.json({ url });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

postRouter.post('/postDonation',UserAuthicationVerify,upload.single('file'),createAddressAndDonationPost);
postRouter.get('/postDonation/:limit/:pageNumber',UserAuthicationVerify,FetchPostData);
postRouter.get("/pickups/:limit/:pageNumber",UserAuthicationVerify, getPickedPostDetails);


postRouter.get('/postDonationById/:limit/:pageNumber', UserAuthicationVerify,FetchPostDataById);
postRouter.delete('/postDonation/:id',deletePost);
export default postRouter;

