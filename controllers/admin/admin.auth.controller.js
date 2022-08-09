const createError = require('http-errors');

const Admin = require('../../models/admin.model');

const { adminAuthMiddleware, genToken } = require('../../middlewares/jwt');

exports.registerAdmin = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (await Admin.findOne({ email: email })) return next(createError(400, 'already exists, please login'))

        const registeringAdmin = new Admin({
            email,
            password
        })

        const registeredAdmin = await registeringAdmin.save()
        const token = await genToken(registeredAdmin._id)

        if (registeredAdmin && token) {
            return res.status(201).json({
                token,
                registeredAdmin
            })
        } else {
            return next(createError(400, 'cannot register the Admin'))
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errorname: error.name,
            message: error.message
        })
    }
}


exports.adminLogin = async (req, res, next) => {

    try {
        console.log('hit admin login');
        const { email, password } = req.body;

        if (!email || !password) return next(createError(400, 'please provide email and password'))

        const admin = await Admin.findOne({ email: email }).select('+password');

        if (!admin) return next(createError(400, 'No admin exists with the provided email'));

        if (!(await admin.checkPassword(password, admin.password))) return next(createError(400, 'Incorrect email or password'));

        const token = await genToken(admin._id );

        if (!token) return next(createError(400, 'cannot generate the token'));

        return res.status(200).json({
            token
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            errorname: error.name,
            message: error.message
        })
    }

}
