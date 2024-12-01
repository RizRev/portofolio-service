import { pool } from "../../index.js";

const userModel = {
    getUser: () => {
        return new Promise((resolve, reject) => {
            pool.query(`SELECT * FROM users`, (error, result) => {
                if (error) {
                    return reject(error);
                }
                return resolve(result.rows);
            })
        })
    },
    createUsers: (data) => {
        console.log(data)
        return new Promise((resolve, reject) => {
            pool.query(`INSERT INTO users (name, email, password) VALUES ('${data.name}','${data.email}','${data.password}')`, (error, result) => {
                if (error) {
                    return reject(error);
                }
                return resolve(result);
            })
        })
    },
    findUsers: (data) => {
        return new Promise((resolve, reject) => {
            pool.query(`SELECT * FROM users WHERE email = '${data.email}'`, (error, result) => {
                if (error) {
                    return reject(error);
                }
                return resolve(result.rows);
            })
        })
    }
}

export default userModel