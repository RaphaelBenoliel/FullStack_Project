const mongoose = require('mongoose');

const studentsInfo = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    _id: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    }

   
});

module.exports = mongoose.model('students', studentsInfo);