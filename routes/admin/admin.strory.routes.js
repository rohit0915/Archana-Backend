const express = require('express');
const router = express.Router();

const { addStory } = require('../../controllers/admin/admin.story.controller');
const {adminAuthMiddleware} = require('../../middlewares/jwt');

router.route('/admin/school-time-story').post(adminAuthMiddleware,addStory)


module.exports = router;
