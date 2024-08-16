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
const PORT = process.env.PORT || 3002;
let server;

app.use(express.json({
    limit: '5mb'
}));
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: ['https://efimenko.tech', 'https://doctor.efimenko.tech', 'http://localhost:5173'],
}));
app.use('/api', router);
app.use(errorMiddleware);
app.use(express.static('./public'));

const start = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017', {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
            dbName: 'foodHelper',
            // user: 'root',
            // pass: 'example',
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
    if (server) {
        server.close(() => {
            console.log(`Перекрыты оставшиеся соединения. Процесс: ${pid}`);
            process.exit();
        });
    } else {
        console.log('Сервер не был активен!');
    }
});

process.on('SIGINT', () => {
    console.log('SIGINT signal received.');
    if (server) {
        server.close(() => {
            console.log(`Перекрыты оставшиеся соединения. Процесс: ${pid}`);
            process.exit();
        });
    } else {
        console.log('Сервер не был активен!');
    }
});

start();
