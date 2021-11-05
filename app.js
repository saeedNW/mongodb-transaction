const express = require('express');
const app = express();
const PORT = '8000'
const {newNumber , updateNumber, removeNumber, newNumberOldWay} = require('./saveNumber')

const connectDB = require('./db');
connectDB()
    .then(async (conn) => {
        /** start server */
        app.listen(PORT, () => {
            console.log(`sever running in on port ${PORT}`);
        });

        /**
         * global database connection
         * this variable will be used to work with transactions
         */
        global.dbConnection = await conn
    })
    .then(async () => {
        await newNumber();
        // await updateNumber();
        // await removeNumber();
        // await newNumberOldWay();

        /** close app after finishing process */
        console.log('done')
        process.exit(1);
    });

