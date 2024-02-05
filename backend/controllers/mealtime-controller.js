const mealTimeService = require('../service/meal-time-service')

class MealtimeController {
    async record(req, res, next) {
        try {
            const status = mealTimeService.record(req.body);

            res.json({ status: 'OK' }).status(status);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new MealtimeController();