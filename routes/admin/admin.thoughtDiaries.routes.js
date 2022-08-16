const express = require('express');
const router = express.Router();

const {getAllThoughtDiariesOfUser} = require('../../controllers/admin/admin.thoughtDiaries.controller');
const { adminAuthMiddleware } = require('../../middlewares/jwt');

router.route('/admin/thought-diaries').post(adminAuthMiddleware,getAllThoughtDiariesOfUser);

module.exports = router;
