const express = require('express');
const router = express.Router();

const {userAuthMiddleware} = require('../../middlewares/jwt');
const {getAllLessons,getLessonById, addAnswerToLessonQuestion, updateLessonUserProgress, getLessonProgress,completedAllLessons} = require('../../controllers/lesson/lesson.controller');

router.route('/lessons').get(userAuthMiddleware,getAllLessons);
router.route('/lessons/completed-all-lessons').patch(userAuthMiddleware,completedAllLessons);

router.route('/lessons/:lessonId').get(userAuthMiddleware,getLessonById);

router.route('/answers/lessons').post(userAuthMiddleware,addAnswerToLessonQuestion);


router.route('/progress/lessons/update').patch(userAuthMiddleware,updateLessonUserProgress);
router.route('/progress/lessons/:lessonId').get(userAuthMiddleware,getLessonProgress);

module.exports = router;
