const mongoose = require('mongoose');

//Define Schema
module.exports = mongoose.model('Device', new mongoose.Schema({
    id: String,
    name: String,
    user: String,
    sensorData: Array
}));

