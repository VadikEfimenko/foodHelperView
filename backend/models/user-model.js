const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
    {
        _id: String,
        name: String,
        email: String,
        doctor: { type: mongoose.Schema.Types.ObjectId },
    },
    { _id: false }
);

module.exports = mongoose.model('User', UserSchema);