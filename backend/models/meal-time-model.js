const mongoose = require('mongoose')

const MealTimeSchema = new mongoose.Schema(
    {
        userId: String,
        text: String,
        date: String,
        foodIntake: String,
        hungryScale: Number,
        satietyScale: Number,
    },
);

module.exports = mongoose.model('MealTime', MealTimeSchema);