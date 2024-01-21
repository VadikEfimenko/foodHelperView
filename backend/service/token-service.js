const jwt = require('jsonwebtoken');
const tokenModel = require('../models/token-model');

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '15m' });
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' });

        return {
            accessToken,
            refreshToken,
        }
    }

    async saveToken(doctorId, refreshToken) {
        const tokenData = await tokenModel.findOne({ doctor: doctorId,  });

        if (tokenData) {
            tokenData.refreshToken = refreshToken;

            return tokenData.save();
        }

        return await tokenModel.create({doctor: doctorId, refreshToken});
    }


    async removeToken(refreshToken) {
        return await tokenModel.deleteOne({ refreshToken });
    }

    async findToken(refreshToken) {
        return await tokenModel.findOne({ refreshToken });
    }

    validateAccessToken(token) {
        try {
            const doctorData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

            return doctorData;
        } catch (e) {
            return null;
        }
    }

    validateRefreshToken(token) {
        try {
            const doctorData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

            return doctorData;
        } catch (e) {
            return null;
        }
    }
}

module.exports = new TokenService();