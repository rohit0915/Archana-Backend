const express = require('express');
const router = express.Router();

const {addSituation, getAllSituations, editSituation,deleteSituation} = require('../../controllers/admin/admin.situation.controller');
const { adminAuthMiddleware } = require('../../middlewares/jwt');

router.route('/admin/situations').post(adminAuthMiddleware,addSituation).get(adminAuthMiddleware,getAllSituations);

router.route('/admin/situations/:situationId').patch(adminAuthMiddleware,editSituation).delete(adminAuthMiddleware,deleteSituation);
module.exports = router;
