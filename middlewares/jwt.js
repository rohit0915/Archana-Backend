
const jwt = require('jsonwebtoken');
const createError = require('http-errors');

const User = require('../models/user.model');
const Admin = require('../models/admin.model');

exports.genToken = async (userId) => {
    try {
        const token = await jwt.sign({ data: userId }, process.env.JWT_SECRET, { expiresIn: '15d' });
        return token;
    } catch (error) {
        console.log(error);
        throw createError(500, 'cannot generate jwt')
    }
}

exports.userAuthMiddleware = async (req, res, next) => {
    try {
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            const token = req.headers.authorization.split(' ')[1];

            const { data: userId } = await jwt.verify(token, process.env.JWT_SECRET);


            const currentUser = await User.findOne({
                _id: userId,
                role: 'user'
            });

            if (currentUser) {
                req.user = userId;

                next();
            } else {
                return next(createError(400, 'Unauthorized access'))
            }

        } else {
            return next(createError(400, 'token not provided'))
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errorName: error.name,
            errorMessage: error.message
        })
    }
}


exports.adminAuthMiddleware = async (req, res, next) => {
    try {
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            const token = req.headers.authorization.split(' ')[1];


            const { data: adminId } = await jwt.verify(token, process.env.JWT_SECRET);

            const currentAdmin = await Admin.findOne({
                _id: adminId,
                role: 'admin'
            });

            if (currentAdmin) {
                req.user = adminId;

                next();
            } else {
                return next(createError(400, 'Unauthorized access'))
            }

        } else {
            return next(createError(400, 'token not provided'))
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errorName: error.name,
            errorMessage: error.message
        })
    }
}