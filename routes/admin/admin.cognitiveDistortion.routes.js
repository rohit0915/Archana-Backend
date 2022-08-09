const express = require('express');
const router = express.Router();

const {adminAuthMiddleware} = require('../../middlewares/jwt');

const {addDistortion} = require('../../controllers/admin/admin.cognitiveDistortion.controller');

router.route('/admin/cognitive').post(adminAuthMiddleware,addDistortion);

module.exports = router;
