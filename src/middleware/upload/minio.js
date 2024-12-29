import { Client } from "minio";
// import globalConfig from "../../config/index.js";

// const minioClient = new Client(globalConfig("/minioConfig"));
// const minioBucket = globalConfig("/minioBucket");

const minioClient = new Client({
    endPoint: "91.108.111.40",
    port: 9000,
    useSSL: false,
    accessKey: process.env.MINIO_ID,
    secretKey: process.env.MINIO_KEY,
});
const minioBucket = "portfolio-service";

export const objectUpload = async (fileName, fileBuffer) => {
    try {
        const isUploaded = await minioClient.fPutObject(
            minioBucket,
            fileName,
            fileBuffer
        )
        console.log(isUploaded)
    } catch (error) {
        console.log("error when upload file", error)
    }
};
