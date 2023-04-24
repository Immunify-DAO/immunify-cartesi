// import crypto from 'crypto'
const crypto = require("crypto");
const { SECRET_KEY, SECRET_IV, ENCRYPTION_METHOD } = require("../config");
// import config from '../config.js'

// const { secret_key, secret_iv, encryption_method } = config

const secret_key = SECRET_KEY;
const secret_iv = SECRET_IV;
const encryption_method = ENCRYPTION_METHOD;

if (!SECRET_KEY || !SECRET_IV || !ENCRYPTION_METHOD) {
  throw new Error('secretKey, secretIV, and encryptionMethod are required')
}

// Generate secret hash with crypto to use for encryption
const key = crypto
  .createHash('sha512')
  .update(secret_key)
  .digest('hex')
  .substring(0, 32)

const encryptionIV = crypto
  .createHash('sha512')
  .update(secret_iv)
  .digest('hex')
  .substring(0, 16)

// Encrypt data
function encryptData(data) {
    return new Promise((resolve, reject) => {
        const cipher = crypto.createCipheriv(encryption_method, key, encryptionIV);
        let encryptedData = '';

        cipher.on('readable', () => {
            let chunk;
            while (null !== (chunk = cipher.read())) {
                encryptedData += chunk.toString('hex');
            }
        });

        cipher.on('end', () => {
            const encryptedBase64 = Buffer.from(encryptedData, 'hex').toString('base64');
            resolve(encryptedBase64);
        });

        cipher.on('error', (err) => {
            reject(err);
        });
        
        cipher.write(data);
        cipher.end();
    });
  }

// Decrypt data
function decryptData(encryptedData) {
    return new Promise((resolve, reject) => {
        const buff = Buffer.from(encryptedData, 'base64');
        const decipher = crypto.createDecipheriv(encryption_method, key, encryptionIV);
        let decrypted = '';

        decipher.on('readable', () => {
            let chunk;
            while (null !== (chunk = decipher.read())) {
                decrypted += chunk.toString('utf8');
            }
        });

        decipher.on('end', () => {
            resolve(decrypted);
        });

        decipher.on('error', (err) => {
            reject(err);
        });

        decipher.write(buff.toString('hex'), 'hex');
        decipher.end();
    });
}

module.exports = { encryptData, decryptData };