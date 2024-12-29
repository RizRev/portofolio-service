import { response } from "../middleware/response.js";
import { uploadPicture } from "../middleware/upload/cloudinary.js";
import { upload } from "../middleware/upload/multer.js";
import { uploadMinio } from "../middleware/upload/uploader.js";
import kostModel from "../model/kost.js";
import { v2 as cloudinary } from 'cloudinary';
import pictureModel from "../model/picture.js";

const kostController = {
    getAll: async (req, res) => {
        try {
            const data = await kostModel.getKost();
            return response(res, {
                status: true,
                code: 200,
                message: "get all kost success",
                data
            })
        } catch (error) {
            return response(res, {
                status: false,
                code: 400,
                message: "get all kost failed",
                error
            })
        }
    },
    createKost: async (req, res) => {
        try {
            const data = req.body
            const result = await kostModel.createKost(data)
            if (result) {
                const dataUpload = await uploadPicture("multiple", req.files)
                const uploadedData = dataUpload.map(async(item) => {
                    try {
                        const data = {
                            Id: result.id,
                            url: item
                        }
                        await pictureModel.uploadPicture(data)
                    } catch (error) {
                        throw new Error(error)
                    }
                })
                await Promise.all(uploadedData)
                console.log(result, dataUpload)
            }
            return response(res, {
                status: true,
                code: 200,
                message: "create kost success",
            })
        } catch (error) {
            return response(res, {
                status: false,
                code: 400,
                message: "create kost failed",
                error
            })
        }
    },
    uploadPicture: async (req, res) => {
        try {
            console.log(req)
            // cloudinary.config({
            //     cloud_name: 'dsxjgmjtz',
            //     api_key: '799227837472329',
            //     api_secret: 'zzWFr6BuUxrIWBDPXbcd0v9Vtc8' // Click 'View API Keys' above to copy your API secret
            // });
            // const uploadResult = await cloudinary.uploader
            //     .upload(
            //         `${req.file.path}`, {
            //         public_id: `${new Date().getTime()}-${req.file.originalname}`,
            //     }
            //     )
            //     .catch((error) => {
            //         throw new Error(error)
            //     });

            // console.log(uploadResult)
            // const uploadResult = await uploadMinio(req.file.path)
            // await kostModel.uploadPicture(data)
            return response(res, {
                status: true,
                code: 200,
                message: "upload picture success",
                // data: uploadResult.secure_url
            })
        } catch (error) {
            return response(res, {
                status: false,
                code: 400,
                message: "upload picture failed",
                error
            })
        }
    }
}

export default kostController