const fs = require("fs");
const sqlite3 = require("sqlite3").verbose();
const filepath = "./health.db";

function createDbConnection() {
    if (fs.existsSync(filepath)) {
        return new sqlite3.Database(filepath);
    } else {
        const db = new sqlite3.Database(filepath, (error) => {
            if (error) {
                return console.error(error.message);
            }
            createTable(db);
        });
        console.log("Connection with Immunify Health DB has been established");
        return db;
    }

}

function createTable(db) {
    db.exec(`
    CREATE TABLE patients   
        (
            ID INTEGER PRIMARY KEY AUTOINCREMENT,
            address VARCHAR(50) NOT NULL,
            name   VARCHAR(50) NOT NULL,
            age   INTEGER NOT NULL
        );
    `);
}

module.exports = createDbConnection();