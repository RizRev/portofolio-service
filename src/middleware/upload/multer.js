import multer from "multer";

const maxSize = 5 * 1024 * 1024;

export const upload = (fieldName) => {
    return async (req, res, next) => {
        const upload = multer({
            storage: multer.diskStorage({}),
        })
        upload.single(fieldName)(req, res, (err) => {
            next();
        })
    }
}
export const uploadMultiple = (fieldName) => {
    return async (req, res, next) => {
        const upload = multer({
            storage: multer.diskStorage({}),
        })
        upload.array(fieldName)(req, res, (err) => {
            next();
        })
    }
}