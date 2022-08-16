const express = require('express');
const router = express.Router();

const {userAuthMiddleware} = require('../../middlewares/jwt'); 

const {getDiary, addFeeling, editDiary} = require('../../controllers/diary/diary.controller');

router.route('/diary').get(userAuthMiddleware,getDiary).patch(userAuthMiddleware,editDiary);

router.route('/diary/add-feelings').patch(userAuthMiddleware,addFeeling);

module.exports = router;
