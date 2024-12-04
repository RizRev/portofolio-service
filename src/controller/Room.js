import { response } from "../middleware/response.js";
import roomModel from "../model/room.js";

const roomController = {
    getAll: async (req, res) => {
        try {
            const data = await roomModel.getRoom();
            return response(res, {
                status: true,
                code: 200,
                message: "get all room success",
                data
            })
        } catch (error) {
            return response(res, {
                status: false,
                code: 400,
                message: "get all room failed",
                error
            })
        }
    }
}

export default roomController