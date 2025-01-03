import { pool } from "../../index.js";

const kostModel = {
    getKost: () => {
        return new Promise((resolve, reject) => {
            pool.query(`SELECT * FROM kost`, (error, result) => {
                if (error) {
                    return reject(error);
                }
                return resolve(result.rows);
            })
        })
    },
    createKost: (data) => {
        return new Promise((resolve, reject) => {
            const query = `
                INSERT INTO kost 
                (name, description, address, timegate, kitchen, parking, laundry, cctv, wifi, security, phone, drinkingwater) 
                VALUES 
                ('${data.name}', '${data.description}', '${data.address}', '${data.timegate}', ${data.kitchen}, '${data.parking}', ${data.laundry}, ${data.cctv}, ${data.wifi}, ${data.security}, '${data.phone}', ${data.drinkingwater})
                RETURNING *;
            `;
            pool.query(query, (error, result) => {
                if (error) {
                    return reject(error);
                }
                return resolve(result.rows[0]);
            });
        });
    }    
}

export default kostModel