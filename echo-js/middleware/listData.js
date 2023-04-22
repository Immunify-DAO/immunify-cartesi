const db = require("../db");

function selectRows() {
    db.each(`SELECT * FROM patients`, (error, row) => {
        if (error) {
            throw new Error(error.message);
        }
        console.log(row);
    });
}

selectRows();