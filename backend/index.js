require('dotenv').config();
const express = require('express');
const cors = require("cors");
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const router = require('./router/index');
const errorMiddleware = require('./middlewares/error-middleware');
const mealTimesModel = require('./models/meal-time-model');
const pid = process.pid;

const app = express();
const PORT = process.env.PORT;
let server;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
}));
app.use('/api', router);
app.use(errorMiddleware);

app.post('/recordMealTime', async (req, res) => {
    try {
        const mealTime = new mealTimesModel(req.body);
        const result = await mealTime.save();

        if (result) {
            res.json({
                status: 'OK',
            });
        }
    } catch (e) {
        console.log('Recorded Error', e);
    }
});

const start = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/foodHelper', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        server = app.listen(PORT, () => {
            console.log(`Сервер активен! Порт: ${PORT}. Процесс: ${pid}`);
        });
    } catch (e) {
        console.log('Error', e);
    }
}

process.on('SIGTERM', () => {
    console.log('SIGTERM signal received.');
    server.close(() => {
        console.log(`Перекрыты оставшиеся соединения. Процесс: ${pid}`);
        process.exit();
    });
});

process.on('SIGINT', () => {
    console.log('SIGINT signal received.');
    server.close(() => {
        console.log(`Перекрыты оставшиеся соединения. Процесс: ${pid}`);
        process.exit();
    });
});

start();
