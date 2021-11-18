/** installed external modules */
const mongoose = require('mongoose');

/**
 *
 * WSL (linux) Configuration
 *
 */

const options = {
    ssl: true,
    sslValidate: true,
    sslCA: '/var/lib/mongo/mongodb.pem',
    authSource: 'replicaSet'
};

/** connect to mongodb */
const connectDB = async () => {
    try {
        let conn = await mongoose.connect('mongodb://admin:replicaSetAdmin13@localhost:27018/replicaSet?replicaSet=rs0', options);

        console.log(`MongoDB Connected: ${conn.connection.host}`)

        return conn
    } catch (error) {
        console.log(error)
        process.exit(1);
    }
}

module.exports = connectDB;