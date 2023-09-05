const mongoose = require('mongoose');

const { MONGODB_CONNECTION_STRING } = require('../config/index');

const dbConnection = async() => {
   try {
    mongoose.set('strictQuery', false);
    const connection = await mongoose.connect(MONGODB_CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    console.log(`Database connected to host: ${connection.connection.host}`);
   }
   catch (error) {
       console.log(`Error: ${error}`);
   }
}

module.exports = dbConnection;