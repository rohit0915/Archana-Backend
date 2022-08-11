const express = require('express');
const router = express.Router();

const {userAuthMiddleware} = require('../../middlewares/jwt');

const {getAllDistortions,getDistortionById,updateDistortionUserProgress,getDistortionProgress,addAnswerToDistortionQuestion,getDistortionExcercize} = require('../../controllers/distortions/distortions.controller');

router.route('/cognitive').get(userAuthMiddleware,getAllDistortions);
router.route('/cognitive-excercize').get(userAuthMiddleware,getDistortionExcercize)
router.route('/cognitive/:distortionId').get(userAuthMiddleware,getDistortionById);


router.route('/answers/cognitive').post(userAuthMiddleware,addAnswerToDistortionQuestion);


router.route('/progress/cognitive/update').patch(userAuthMiddleware,updateDistortionUserProgress);
router.route('/progress/cognitive/:distortionId').get(userAuthMiddleware,getDistortionProgress);


module.exports = router;
