const db = require("../../../db");

function getRowDoctor(address) {
    return new Promise((resolve, reject) => {
        db.all(
            `SELECT * FROM doctors WHERE address = ?`, 
            [address],
            function (error, rows) {
                if (error) {
                    reject(error);
                    console.log(error);
                } else {
                    const values = rows.map((row) => Object.values(row));
                    console.log(values);
                    resolve(values);
                }
            }
        );
    });
}

function insertRowDoctor(address, name) {
    return new Promise((resolve, reject) => {
        db.run(
            `INSERT INTO doctors (address, name) VALUES (?, ?)`,
            [address, name],
            function (error) {
                if (error) {
                    reject(error);
                    console.log(error);
                } else {
                    resolve(this.lastID);
                }
            }
        );
    });
}

module.exports = { getRowDoctor, insertRowDoctor };