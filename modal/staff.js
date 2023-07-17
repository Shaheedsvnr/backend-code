const mongoose = require('mongoose');

const { Schema } = mongoose;

const StaffSchema = new Schema({
    staff_name: {
        type: String,
        required: true,
    },
    staff_phone: {
        type: Number,
        required: true,
    },
    staff_email: {
        type: String,
        required: true,
        unique: true
    },
    staff_address: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("staff", StaffSchema);