const mongoose = require('mongoose');
const user = require('./User')

const CourseSchema = new mongoose.Schema({
    courses : [
        {
            type :String,
            required : true

        }
    ],
    hour : {
        type : String,
        required : true
    },
    period : {
        type : String,
        required: true
    },
    date : {
        type : Date,
        default : Date.now
    }
})

const UserCourse = mongoose.model('UserCourse', CourseSchema)

module.exports = UserCourse;