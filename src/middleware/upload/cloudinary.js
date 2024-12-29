import { v2 as cloudinary } from 'cloudinary';

export const uploadPicture = async (type, file) => {
    console.log("ini file", file);

    cloudinary.config({
        cloud_name: "dsxjgmjtz",
        api_key: "799227837472329",
        api_secret: "zzWFr6BuUxrIWBDPXbcd0v9Vtc8",
    });

    let uploadResult = [];

    if (type === "multiple") {
        const promises = file.map(async (item) => {
            try {
                const result = await cloudinary.uploader.upload(item.path, {
                    public_id: `${new Date().getTime()}-${item.originalname}`,
                });
                return result;
            } catch (error) {
                throw new Error(error);
            }
        });

        uploadResult = await Promise.all(promises);
    } else {
        try {
            const result = await cloudinary.uploader.upload(file.path, {
                public_id: `${new Date().getTime()}-${file.originalname}`,
            });
            uploadResult.push(result);
        } catch (error) {
            throw new Error(error);
        }
    }

    return type === "multiple"
        ? uploadResult.map((item) => item.secure_url)
        : uploadResult[0].secure_url;
};
