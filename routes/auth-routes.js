const express = require('express');

const { body } = require('express-validator');

const router = express.Router();

const User = require('../models/user');

const authController = require('../controllers/auth-controller');

router.get('/', (req, res) => res.render('login'));

router.post('/', authController.login);

router.get('/forgot-password', (req, res) => res.render('forgot-password'));

router.post('/forgot-password', authController.forgotPassword);

router.get('/reset-password/:id/:token', authController.goToResetPassword);

router.post('/reset-password/:id/:token', authController.resetPassword);

module.exports = router;