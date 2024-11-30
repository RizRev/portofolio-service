import { response } from "../middleware/response.js";

const UsersController = {
    getUsers: (req, res) => {
        try {
            response(
                res, 
                {
                    status: true,
                    code: 200,
                    message: "get users success",
                }
            )
        } catch (error) {
            response(
                res,
                {
                    status: false,
                    code: 400,
                    message: "get users failed",
                    error
                }
            )
        }
    },
    createUsers: (req, res) => {
        try {
            console.log(req.body)
            const data = req.body
            return response(res, 200, true, "create users success",data = data)
        } catch (error) {
            console.log(error)
            return response(res, 400, false, "create users failed")
        }
    }
}

export default UsersController