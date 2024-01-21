const userModel = require('../models/user-model');
const mealTimesModel = require('../models/meal-time-model');

function formatDateISO8601ToDMY(iso8601) {
    const date = new Date(iso8601);

    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1;
    const year = date.getUTCFullYear();

    return `${day.toString().padStart(2, '0')}.${month.toString().padStart(2, '0')}.${year}`;
}

class UserService {
    async getAllUsers() {
        const users = await userModel.find({});

        return users;
    }

    async getUserById(userId) {
        const mixedMealTimes = await mealTimesModel.find({ userId });
        const user = await userModel.findById(userId);

        const mealTimes = {};

        for (let i = 0; i < mixedMealTimes.length; i++) {
            const currentDate = formatDateISO8601ToDMY(mixedMealTimes[i].date);

            if (!mealTimes.hasOwnProperty(currentDate)) {
                mealTimes[currentDate] = [];
            }

            mealTimes[currentDate].push(mixedMealTimes[i]);
        }

        return { mealTimes, user };
    }
}

module.exports = new UserService();