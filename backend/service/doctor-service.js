const DoctorModel = require('../models/doctor-model');
const bcrypt = require('bcrypt');
const tokenService = require('../service/token-service');
const DoctorDto = require('../dtos/doctor-dto');
const ApiError = require("../exceptions/api-error");

class DoctorService {
    async login(login, password) {
        const doctor = await DoctorModel.findOne({ login });

        if (!doctor) {
            throw ApiError('Пользователь с таким логином не найден');
        }

        const isPasswordEquals = await bcrypt.compare(password, doctor.password);

        if (!isPasswordEquals) {
            throw ApiError('Некорректный пароль');
        }

        const doctorDto = new DoctorDto(doctor);
        const tokens = tokenService.generateTokens({...doctorDto});
        await tokenService.saveToken(doctorDto.id, tokens.refreshToken);

        return {
            ...tokens,
            doctor: doctorDto,
        }
    }

    async registration(login, password) {
        const candidate = await DoctorModel.findOne({ login });

        if (candidate) {
            throw ApiError.BadRequest(`Доктор с логиновм ${login} уже существует`);
        }

        const hashPassword = await bcrypt.hash(password, 3)
        const doctor = await DoctorModel.create({ login, password: hashPassword });
        const doctorDto = new DoctorDto(doctor);
        const tokens = tokenService.generateTokens({...doctorDto});

        await tokenService.saveToken(doctorDto.id, tokens.refreshToken);

        return {
            ...tokens,
            doctor: doctorDto,
        }
    }

    async logout(refreshToken) {
        return await tokenService.removeToken(refreshToken);
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError();
        }

        const doctorData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);

        if (!doctorData || !tokenFromDb) {
            throw ApiError.UnauthorizedError();
        }

        const doctor = await DoctorModel.findById(doctorData.id);
        const doctorDto = new DoctorDto(doctor);
        const tokens = tokenService.generateTokens({...doctorDto});

        await tokenService.saveToken(doctorDto.id, tokens.refreshToken);

        return {
            ...tokens,
            doctor: doctorDto,
        }
    }
}

module.exports = new DoctorService();