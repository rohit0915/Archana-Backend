const express = require('express');
const router = express.Router();

const {adminAuthMiddleware} = require('../../middlewares/jwt');
const {getAllUsers, getUserById, deleteUserById,getAllAnswerOnSchoolstoryByUser,getAllAnswerOnLessonByUser} = require('../../controllers/admin/admin.user.controller');

router.route('/admin/users').get(adminAuthMiddleware,getAllUsers);
router.route('/admin/users/:userId').get(adminAuthMiddleware,getUserById).delete(adminAuthMiddleware,deleteUserById)

router.route('/admin/answers/school-time-stories').post(adminAuthMiddleware,getAllAnswerOnSchoolstoryByUser);
router.route('/admin/answers/lesson').post(adminAuthMiddleware,getAllAnswerOnLessonByUser);


module.exports = router;
