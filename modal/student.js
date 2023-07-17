const mongoose = require('mongoose');

const { Schema } = mongoose;

const StudentSchema = new Schema({
    teacher_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'teacher'
    },
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("student", StudentSchema);