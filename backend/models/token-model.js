const { Schema, model } = require('mongoose')

const TokenSchema = new Schema(
    {
        doctor: { type: Schema.Types.ObjectId, ref: 'Doctor' },
        refreshToken: { type: String, required: true },
    },
);

module.exports = model('Token', TokenSchema);