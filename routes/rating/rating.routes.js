const express = require('express');
const router = express.Router();

const {userAuthMiddleware} = require('../../middlewares/jwt');
const {addRating} = require('../../controllers/rating/rating.controller');

router.route('/ratings').post(userAuthMiddleware,addRating);

module.exports = router;
