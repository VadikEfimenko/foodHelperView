const mealTimesModel = require("../models/meal-time-model");
const ApiError = require("../exceptions/api-error");

class MealTimeService {
    async record(payload) {
        const mealTime = new mealTimesModel(payload);
        const result = await mealTime.save();

        if (!result) {
            throw ApiError('Не получилось записать');
        }

        return 200;
    }
}

module.exports = new MealTimeService();