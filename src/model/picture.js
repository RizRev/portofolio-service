import { pool } from "../../index.js";

const pictureModel = {
    uploadPicture: async (data) => {
        return new Promise((resolve, reject) => {
            pool.query(`INSERT INTO picture (chainId,url) VALUES ('${data.Id}','${data.url}')`, (error, result) => {
                if (error) {
                    return reject(error);
                }
                return resolve(result);
            })
        })
    }
};

export default pictureModel