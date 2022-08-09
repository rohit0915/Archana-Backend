const express = require('express');
const router = express.Router();

const {adminAuthMiddleware} = require('../../middlewares/jwt');
const {addLesson,getLessonById} = require('../../controllers/admin/admin.lesson.controller');

router.route('/admin/lessons').post(adminAuthMiddleware,addLesson);
router.route('/admin/lessons/:lessonId').get(adminAuthMiddleware,getLessonById)
module.exports = router;
