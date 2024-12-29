import dotenv from "dotenv";
dotenv.config();
import confidence from "confidence";
const config ={
    port: process.env.PORT,
    pgsqlConfig: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        name: process.env.DB_NAME
    },
    minioConfig: {
        endPoint: process.env.MINIO_SERVER,
        useSSL: false,
        accessKey: process.env.MINIO_ID,
        secretKey: process.env.MINIO_KEY,
    },
    minioBucket: process.env.MINIO_BUCKET
}
const store = new confidence.Store(config);
export const globalConfig = (key) => store.get(key);