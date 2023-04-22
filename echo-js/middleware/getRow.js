const db = require("../db");

function getRow(address) {
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

module.exports = getRow;