const userService = require('../service/user-service')

class UserController {
    async getAllUsers(req, res, next) {
        try {
            const users = await userService.getAllUsers();

            res.json(users).status(200);
        } catch (e) {
            next(e);
        }
    }

    async getUserById(req, res, next) {
        try {
            const { userId } = req.body;

            const userEntity = await userService.getUserById(userId);

            res.json(userEntity).status(200);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new UserController();