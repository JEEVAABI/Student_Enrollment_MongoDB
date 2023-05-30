const mongoose = require('mongoose');
const studentSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    enrolledDeparment:{
        type:String,
        required:true
    },
    enrollmentDate:{
        type:Date,
        default: Date.now()
    }
})
module.exports = mongoose.model('studentModel',studentSchema) 