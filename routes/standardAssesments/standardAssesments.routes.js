const express = require('express');
const router = express.Router();

const { getPhq9Result, updatePhq9Result, getGad7Result,updateGad7Result,diagnosisPhq9,diagnosisGad7 } = require('../../controllers/standardAssesments/standardAssesments.controller');

const {userAuthMiddleware} = require('../../middlewares/jwt');

router.route('/phq9-result').get(userAuthMiddleware,getPhq9Result).patch(userAuthMiddleware,updatePhq9Result);
router.route('/gad7-result').get(userAuthMiddleware,getGad7Result).patch(userAuthMiddleware,updateGad7Result);
router.route('/what-score-means/phq9-result').post(userAuthMiddleware,diagnosisPhq9);
router.route('/what-score-means/gad7-result').post(userAuthMiddleware,diagnosisGad7);

module.exports = router;