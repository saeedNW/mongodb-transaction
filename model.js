// require packages
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

// create users schema
const NumberSchema = new Schema({
    number: {type: Number, required: true},
});


exports.numberModel = mongoose.model('Number', NumberSchema);
