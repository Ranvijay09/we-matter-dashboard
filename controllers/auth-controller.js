const { validationResult } = require('express-validator');

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const User = require('../models/user');

const JWT_SECRET = '#$##$%$VINOD$#%$%%';

exports.login = async (req, res, next) => {
    const { email, pwd } = req.body;

    try {
        const user = await User.find(email);

        if (user[0].length !== 1) {
            const error = new Error('A user with this email could not be found.');
            error.statusCode = 401;
            throw error;
        }

        const storedUser = user[0][0];

        const isEqual = await bcrypt.compare(pwd, storedUser.pwd);

        if (!isEqual) {
            const error = new Error('Wrong password!');
            error.statusCode = 401;
            throw error;
        }

        const token = jwt.sign(
            {
                email: storedUser.email,
                userId: storedUser.id,
            },
            JWT_SECRET,
            { expiresIn: '1h' }
        );
        res.status(200).json({ token: token, userId: storedUser.id });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.forgotPassword = async (req, res, next) => {
    const { email } = req.body;

    const user = await User.find(email);

    if (user[0].length !== 1) {
        const error = new Error('A user with this email could not be found.');
        error.statusCode = 401;
        throw error;
    }

    const storedUser = user[0][0];

    const secret = JWT_SECRET + storedUser.pwd;

    const token = jwt.sign(
        {
            email: storedUser.email,
            userId: storedUser.id,
        },
        secret,
        { expiresIn: '1m' }
    );

    const link = `http://localhost:3000/reset-password/${storedUser.user_id}/${token}`;

    console.log(link);

    res.status(200).json({ token: token, userId: storedUser.id });
};

exports.goToResetPassword = async (req, res, next) => {
    const { id, token } = req.params;

    const user = await User.findById(id);

    if (user[0].length !== 1) {
        const error = new Error('User not found.');
        error.statusCode = 401;
        throw error;
    }

    const storedUser = user[0][0];

    const secret = JWT_SECRET + storedUser.pwd;

    try {
        const payload = jwt.verify(token, secret);

        res.render('reset-password', { email: storedUser.email });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.resetPassword = async (req, res, next) => {
    const { id, token } = req.params;

    const { pwd, cpwd } = req.body;

    const user = await User.findById(id);

    if (user[0].length !== 1) {
        const error = new Error('User not found.');
        error.statusCode = 401;
        throw error;
    }

    const storedUser = user[0][0];

    const secret = JWT_SECRET + storedUser.pwd;

    try {
        const payload = jwt.verify(token, secret);

        if(pwd === cpwd) {
            const hashedPassword = await bcrypt.hash(pwd, 12);

            User.updatePwdById(id, hashedPassword);
        }
        res.render('login');
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};