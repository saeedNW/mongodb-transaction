/** installed external modules */
const mongoose = require('mongoose');

/** connect to mongodb */
const connectDB = async () => {
    try {
        let conn = await mongoose.connect('mongodb://localhost:27017/replicaSet?replicaSet=rs0');

        console.log(`MongoDB Connected: ${conn.connection.host}`)

        return conn
    } catch (error) {
        console.log(error)
        process.exit(1);
    }
}

module.exports = connectDB;