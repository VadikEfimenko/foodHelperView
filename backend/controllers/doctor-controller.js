const doctorService = require('../service/doctor-service')
const { validationResult } = require('express-validator')
const ApiError = require('../exceptions/api-error');

class DoctorController {
    async registration(req, res, next) {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return next(ApiError('Ошибка при валидации', errors.array()));
            }

            const { login, password } = req.body;
            const doctorData = await doctorService.registration(login, password);

            res.cookie('refreshToken', doctorData.refreshToken , { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true, secure: true });

            return res.json(doctorData);
        } catch (e) {
            next(e);
        }
    }

    async login(req, res, next) {
        try {
            const { login, password } = req.body;

            const doctorData = await doctorService.login(login, password);

            res.cookie('refreshToken', doctorData.refreshToken , { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true, secure: true });

            return res.json(doctorData);
        } catch (e) {
            next(e);
        }
    }

    async logout(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            const token =  await doctorService.logout(refreshToken);

            res.clearCookie('refreshToken');

            return res.json(token);
        } catch (e) {
            next(e);
        }
    }

    async refresh(req, res, next) {
        try {
            const { refreshToken } = req.cookies;

            const doctorData = await doctorService.refresh(refreshToken);

            res.cookie('refreshToken', doctorData.refreshToken , { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true, secure: true });

            return res.json(doctorData);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new DoctorController();