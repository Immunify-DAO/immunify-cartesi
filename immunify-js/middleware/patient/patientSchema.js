const db = require("../../db");

function getRowPatient(address) {
    return new Promise((resolve, reject) => {
        db.all(
            `SELECT * FROM patients WHERE address = ?`, 
            [address],
            function (error, rows) {
                if (error) {
                    reject(error);
                } else {
                    const values = rows.map((row) => Object.values(row));
                    console.log(values);
                    resolve(values);
                }
            }
        );
    });
}

function insertRowPatient(address, name, age) {
    return new Promise((resolve, reject) => {
        db.run(
            `INSERT INTO patients (address, name, age) VALUES (?, ?, ?)`,
            [address, name, age],
            function (error) {
                if (error) {
                    reject(error);
                } else {
                    resolve(this.lastID);
                }
            }
        );
    });
}


module.exports = { getRowPatient, insertRowPatient };