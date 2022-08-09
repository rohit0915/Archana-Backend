const express = require('express');
const router = express.Router();

const {userAuthMiddleware} = require('../../middlewares/jwt');

const {getAllSchoolStories, getSchoolStoriesById,addAnswerToStoryQuestion,updateSchoolStoryUserProgress,getSchoolTimeStoryProgress} = require('../../controllers/schoolStories/schoolStories.controller')

router.route('/school-time-stories').get(userAuthMiddleware,getAllSchoolStories)

router.route('/school-time-stories/:schoolTimeStoryId').get(userAuthMiddleware,getSchoolStoriesById)

router.route('/answers/school-time-stories').post(userAuthMiddleware,addAnswerToStoryQuestion)


router.route('/progress/school-time-story/update').patch(userAuthMiddleware,updateSchoolStoryUserProgress)
router.route('/progress/school-time-story/:schoolTimeStoryId').get(userAuthMiddleware,getSchoolTimeStoryProgress)
module.exports = router;
