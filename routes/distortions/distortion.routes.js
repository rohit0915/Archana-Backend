const express = require('express');
const router = express.Router();

const {userAuthMiddleware} = require('../../middlewares/jwt');

const {getAllDistortions,getDistortionById,updateDistortionUserProgress,getDistortionProgress} = require('../../controllers/distortions/distortions.controller');

router.route('/cognitive').get(userAuthMiddleware,getAllDistortions);
router.route('/cognitive/:distortionId').get(userAuthMiddleware,getDistortionById);


router.route('/progress/cognitive/update').patch(userAuthMiddleware,updateDistortionUserProgress);
router.route('/progress/cognitive/:distortionId').get(userAuthMiddleware,getDistortionProgress);


module.exports = router;
