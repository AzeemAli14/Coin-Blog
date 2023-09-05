const dotenv = require('dotenv').config();

const PORT = process.env.PORT || 5000;

const MONGODB_CONNECTION_STRING = process.env.MONGODB_CONNECTION_STRING;

module.exports = {
    PORT,
    MONGODB_CONNECTION_STRING
}