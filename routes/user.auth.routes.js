const express = require('express');
const router = express.Router();

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/profileImages')
    },
    filename: function (req, file, cb) {
        cb(null, `${file.fieldname}-${req.user}.${file.originalname.split('.')[1]}`);
    }
})

const upload = multer({ storage: storage })


const { userAuthMiddleware } = require('../middlewares/jwt');
const { userSignUp, userLogin } = require('../controllers/user/user.auth.controller');
const { getCurrentUser, updateUserDetails, saveCurrentLocation, editUserDetails } = require('../controllers/user/user.details.controller');

router.route('/users/signup').post(userSignUp);
router.route('/users/login').post(userLogin);

router.route('/users/me').get(userAuthMiddleware, getCurrentUser).patch(userAuthMiddleware, updateUserDetails);
router.route('/users/save-location').post(userAuthMiddleware, saveCurrentLocation);
router.route('/users/updateprofile-details').patch(userAuthMiddleware, upload.single('profile'), editUserDetails);
module.exports = router;
