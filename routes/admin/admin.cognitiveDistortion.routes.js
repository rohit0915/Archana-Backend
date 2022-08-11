const express = require('express');
const router = express.Router();

const {adminAuthMiddleware} = require('../../middlewares/jwt');

const {addDistortion, addDistortionExcercize} = require('../../controllers/admin/admin.cognitiveDistortion.controller');

router.route('/admin/cognitive').post(adminAuthMiddleware,addDistortion);
router.route('/admin/cognitive-excercize').post(adminAuthMiddleware,addDistortionExcercize);


module.exports = router;
