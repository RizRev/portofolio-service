import {objectUpload} from "./minio.js"

export const uploadMinio = async (fileBuffer) => {
    const fileExtention = type.split("/")[1];
    const fileName = `${new Date().getTime()}.${fileExtention}`
    const uploadResult = await objectUpload(fileName, fileBuffer)
    return uploadResult
}