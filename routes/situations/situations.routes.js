const express = require('express');
const router = express.Router();

const {userAuthMiddleware} = require('../../middlewares/jwt')
const {getAllSituations} = require('../../controllers/situations/situations.controller');

router.route('/situations').get(userAuthMiddleware,getAllSituations);

module.exports = router;
