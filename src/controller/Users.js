import { response } from "../middleware/response.js";
import userModel from "../model/user.js";

const UsersController = {
    getUsers: async (req, res) => {
        try {
            const data = await userModel.getUser();
            console.log(data)
            response(
                res,
                {
                    status: true,
                    code: 200,
                    message: "get users success",
                    data
                }
            )
        } catch (error) {
            console.log(error)
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
    createUsers: async (req, res) => {
        try {
            const data = req.body
            const dataCheck = await userModel.findUsers(data)
            if (dataCheck.length > 0) {
                return response(res, {
                    status: false,
                    code: 400,
                    message: "email already exists"
                })
            }
            await userModel.createUsers(data)
            return response(res, {
                status: true,
                code: 200,
                message: "create users success"
            })
        } catch (error) {
            return response(res, {
                status: false,
                code: 400,
                message: "create users failed",
                error
            })
        }
    },
    loginUsers: async (req, res) => {
        try {
            const userData = await userModel.findUsers(req.body)
            if (userData.length === 0) {
                return response(res, {
                    status: false,
                    code: 400,
                    message: "user not found"
                })
            }
            if (userData[0].password !== req.body.password) {
                return response(res, {
                    status: false,
                    code: 400,
                    message: "wrong password"
                })
            }
            return response(res, {
                status: true,
                code: 200,
                message: "login users success",
                data: userData[0]
            })
        } catch (error) {
            return response(res, {
                status: false,
                code: 400,
                message: "login users failed",
                error
            })
        }
    }
}

export default UsersController