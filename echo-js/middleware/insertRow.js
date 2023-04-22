const db = require("../db");

function insertRow(address, name, age) {
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

module.exports = insertRow;