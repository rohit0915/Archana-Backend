const express = require('express');
const router = express.Router();

const {adminAuthMiddleware} = require('../../middlewares/jwt');

const {addDistortion, addDistortionExcercize, getAllCognitiveDistortion, getCognitiveDistortionById,editCognitiveDistortionById,deleteCognitiveDistortionById, getAllCognitiveDistortionExcercize, deleteDistortionExcercizeById} = require('../../controllers/admin/admin.cognitiveDistortion.controller');

router.route('/admin/cognitive').post(adminAuthMiddleware,addDistortion).get(adminAuthMiddleware,getAllCognitiveDistortion);

router.route('/admin/cognitive/:distortionId').get(adminAuthMiddleware,getCognitiveDistortionById).patch(adminAuthMiddleware,editCognitiveDistortionById).delete(adminAuthMiddleware,deleteCognitiveDistortionById);

router.route('/admin/cognitive-excercize').post(adminAuthMiddleware,addDistortionExcercize).get(adminAuthMiddleware,getAllCognitiveDistortionExcercize);

router.route('/admin/cognitive-excercize/:excercizeId').delete(adminAuthMiddleware,deleteDistortionExcercizeById);


module.exports = router;
