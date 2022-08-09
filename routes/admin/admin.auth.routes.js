const express = require('express');
const router = express.Router();

const {registerAdmin,adminLogin} = require('../../controllers/admin/admin.auth.controller');

router.route('/admin/register').post(registerAdmin);
router.route('/admin/login').post(adminLogin);

module.exports = router;
