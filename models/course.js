const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    courses: {
        type : String,
        required : true
    },
    hour : {
        type : String,
        required : true
    },
    period : {
        type : String,
        required : true
    },
    date : {
        type : Date,
        default : Date.now
    }
})

const tableContent = mongoose.model('tableContent', CourseSchema)

module.exports = tableContent;