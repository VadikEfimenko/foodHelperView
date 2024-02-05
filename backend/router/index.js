const Router = require('express').Router;
const doctorController = require('../controllers/doctor-controller');
const userController = require('../controllers/user-controller');
const mealtimeController = require('../controllers/mealtime-controller');
const { body } = require('express-validator');
const authMiddleware = require('../middlewares/auth-middleware');

const router = new Router();

router.post(
    '/login',
    doctorController.login,
);
router.post('/logout', doctorController.logout);
router.post(
    '/registration',
    body('password').isLength({ min: 6, max: 16 }),
    body('login').isLength({ min: 4, max: 16 }),
    body('secretKey').custom((value) => value === process.env.SECRET_KEY),
    doctorController.registration,
);
router.post('/refresh', doctorController.refresh);
router.post('/recordMealTime', mealtimeController.record);
router.post('/getAllUsers', authMiddleware, userController.getAllUsers);
router.post('/getUserById', authMiddleware, userController.getUserById);
router.get('/refresh', doctorController.refresh);

module.exports = router;