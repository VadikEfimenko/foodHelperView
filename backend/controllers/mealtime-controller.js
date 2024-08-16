const mealTimeService = require('../service/meal-time-service');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '_' + file.originalname);
    }
});

class MealtimeController {
    async record(req, res, next) {
        console.log('req', req.headers.origin + '/' + req.file.path);

        // try {
        //     // const status = mealTimeService.record(req.body);
        //
            res.json({ status: 'OK' });
        //     // res.json({ status: 'OK' }).status(status);
        // } catch (e) {
        //     next(e);
        // }
        //
        // try {
        //     await fetch('https://efimenko.tech/bot/sendNotify', {
        //         method: 'POST',
        //         body: JSON.stringify(req.body),
        //         headers: {
        //             'Content-Type': 'application/json'
        //         }
        //     });
        // } catch (e) {
        //     console.log('Notify error', e);
        //     next(e);
        // }
    }
}

module.exports = new MealtimeController();