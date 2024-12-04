import { response } from "../middleware/response.js";
import kostModel from "../model/kost.js";

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
            await kostModel.createKost(data)
            return response(res, {
                status: true,
                code: 200,
                message: "create kost success"
            })
        } catch (error) {
            return response(res, {
                status: false,
                code: 400,
                message: "create kost failed",
                error
            })
        }
    }
}

export default kostController