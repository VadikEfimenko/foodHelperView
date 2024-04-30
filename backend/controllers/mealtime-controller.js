const mealTimeService = require('../service/meal-time-service');


class MealtimeController {
    async record(req, res, next) {
        try {
            const status = mealTimeService.record(req.body);

            res.json({ status: 'OK' }).status(status);
        } catch (e) {
            next(e);
        }

        try {
            await fetch('https://efimenko.tech/bot/sendNotify', {
                method: 'POST',
                body: JSON.stringify({
                    queryId: req.body.queryId,
                    message: req.body.text,
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        } catch (e) {
            console.log('Notify error', e);
            next(e);
        }
    }
}

module.exports = new MealtimeController();