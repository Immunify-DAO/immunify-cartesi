// import dotenv from 'dotenv'
const dotenv = require("dotenv");

dotenv.config();

// const { NODE_ENV, PORT, SECRET_KEY, SECRET_IV, ENCRYPTION_METHOD } = process.env;

const NODE_ENV = "development";
const PORT = 3000;
const SECRET_KEY = "secretKey";
const SECRET_IV = "secretIV";
const ENCRYPTION_METHOD = "aes-256-cbc";

module.exports = {
    NODE_ENV,
    PORT,
    SECRET_KEY,
    SECRET_IV,
    ENCRYPTION_METHOD,
};
