const mongoose = require('mongoose')

const DoctorSchema = new mongoose.Schema(
    {
        login: { type: String },
        password: { type: String, required: true },
    },
);

module.exports = mongoose.model('Doctor', DoctorSchema);