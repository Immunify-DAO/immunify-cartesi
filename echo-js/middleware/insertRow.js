const db = require("../db");

// function insertRow(name, age, weight) {
//     // const [name, age, weight] = process.argv.slice(2);
//     db.run(
//         `INSERT INTO patients (name, age, weight) VALUES (?, ?, ?)`,
//         [name, age, weight],
//         function (error) {
//             if (error) {
//                 console.error(error.message);
//             }
//             console.log(`Inserted a row with the ID: ${this.lastID}`);
//         }
//     );
// }

function insertRow(name, age, weight) {
    return new Promise((resolve, reject) => {
        db.run(
            `INSERT INTO patients (name, age, weight) VALUES (?, ?, ?)`,
            [name, age, weight],
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

// insertRow();
module.exports = insertRow;