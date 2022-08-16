const express = require('express');
const router = express.Router();

const { addStory, getAllSchoolTimeStories, getSchoolTimeStoryById, editSchoolTimeStoryById, deleteSchoolTimeStoryById } = require('../../controllers/admin/admin.story.controller');
const {adminAuthMiddleware} = require('../../middlewares/jwt');

router.route('/admin/school-time-story').post(adminAuthMiddleware,addStory).get(adminAuthMiddleware,getAllSchoolTimeStories)

router.route('/admin/school-time-story/:schoolTimeStoryId').get(adminAuthMiddleware,getSchoolTimeStoryById).patch(adminAuthMiddleware,editSchoolTimeStoryById).delete(adminAuthMiddleware,deleteSchoolTimeStoryById);

module.exports = router;
