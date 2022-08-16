const express = require('express');
const router = express.Router();

const {adminAuthMiddleware} = require('../../middlewares/jwt');
const {addLesson,getLessonById, getAllLessons,editLessonById, deleteLessonById} = require('../../controllers/admin/admin.lesson.controller');

router.route('/admin/lessons').post(adminAuthMiddleware,addLesson).get(adminAuthMiddleware,getAllLessons);
router.route('/admin/lessons/:lessonId').get(adminAuthMiddleware,getLessonById).patch(adminAuthMiddleware,editLessonById).delete(adminAuthMiddleware,deleteLessonById);
module.exports = router;
