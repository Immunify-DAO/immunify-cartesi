const db = require("../../db");

function getRowConsultation(id) {
    return new Promise((resolve, reject) => {
        db.all(
            `SELECT * FROM consultations WHERE id = ?`, 
            [id],
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

function insertRowConsultation(history) {
    return new Promise((resolve, reject) => {
        db.run(
            `INSERT INTO consultations (history) VALUES (?)`,
            [history],
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


module.exports = { getRowConsultation, insertRowConsultation };