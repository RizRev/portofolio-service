import { pool } from "../../index.js";

const roomModel = {
    getRoom: () => {
        return new Promise((resolve, reject) => {
            pool.query(`SELECT * FROM room`, (error, result) => {
                if (error) {
                    return reject(error);
                }
                return resolve(result.rows);
            })
        })
    },
    // createKost: (data) => {
    //     return new Promise((resolve, reject) => {
    //         const query = `
    //             INSERT INTO kost 
    //             (name, description, address, timegate, kitchen, parking, laundry, cctv, wifi, security, phone, drinkingwater) 
    //             VALUES 
    //             ('${data.name}', '${data.description}', '${data.address}', '${data.timegate}', ${data.kitchen}, '${data.parking}', ${data.laundry}, ${data.cctv}, ${data.wifi}, ${data.security}, '${data.phone}', ${data.drinkingwater})
    //         `;
    //         pool.query(query, (error, result) => {
    //             if (error) {
    //                 return reject(error);
    //             }
    //             return resolve(result);
    //         });
    //     });
    // }    
}

export default roomModel