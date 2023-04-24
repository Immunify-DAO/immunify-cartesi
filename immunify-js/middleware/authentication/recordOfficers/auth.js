const db = require("../../../db");

function getRowRecord(address) {
    return new Promise((resolve, reject) => {
        db.all(
            `SELECT * FROM recordStaff WHERE address = ?`, 
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

function insertRowRecord(address, name) {
    return new Promise((resolve, reject) => {
        db.run(
            `INSERT INTO recordStaff (address, name) VALUES (?, ?)`,
            [address, name],
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

module.exports = { getRowRecord, insertRowRecord };