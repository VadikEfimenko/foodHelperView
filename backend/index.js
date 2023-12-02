const express = require('express');
const cors = require("cors");
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/foodHelper', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('Connected to the database');
    })
    .catch((error) => {
        console.error('Error connecting to the database:', error);
    });

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

const MealTime = mongoose.model('MealTime', MealTimeSchema);

const app = express();
const PORT = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());

app.post('/recordMealTime', async (req, res) => {
    try {
        const mealTime = new MealTime(req.body);
        const result = await mealTime.save();

        if (result) {
            console.log('MealTime recorded');
            res.json({
                status: 'OK',
            });
        }
    } catch (e) {
        console.log('Recorded Error', e);
    }
});

app.listen(PORT, () => {
    console.log('Сервер активен!');
});