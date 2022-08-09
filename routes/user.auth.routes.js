const express = require('express');
const router = express.Router();

const {userAuthMiddleware} = require('../middlewares/jwt');
const {userSignUp,userLogin} = require('../controllers/user/user.auth.controller');
const {getCurrentUser, updateUserDetails,saveCurrentLocation} = require('../controllers/user/user.details.controller');

router.route('/users/signup').post(userSignUp);
router.route('/users/login').post(userLogin);

router.route('/users/me').get(userAuthMiddleware,getCurrentUser).patch(userAuthMiddleware,updateUserDetails);
router.route('/users/save-location').post(userAuthMiddleware,saveCurrentLocation)
module.exports = router;
