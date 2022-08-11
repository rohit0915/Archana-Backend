const express = require('express');
const router = express.Router();

const {userAuthMiddleware} = require('../../middlewares/jwt');
const {addRating, addRatingToDistortion} = require('../../controllers/rating/rating.controller');

router.route('/ratings').post(userAuthMiddleware,addRating);

router.route('/ratings/cognitive').post(userAuthMiddleware,addRatingToDistortion);

module.exports = router;
