const createError = require('http-errors');
const express = require('express');
const router = express.Router();

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/banner')
    },
    filename: function (req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}.${file.originalname.split('.')[1]}`);
    }
})
const fileFilter = function (req, file, cb) {
    if (file.mimetype.split('/')[0] !== 'video') {
        cb(createError(400, 'unsupported file type'), false);
    } else {
        cb(null, true);
    }
}

const upload = multer({ storage: storage, fileFilter: fileFilter });
// const upload = multer({ storage: storage });


const { adminAuthMiddleware } = require('../../middlewares/jwt');

const { getStartJourney, editStartJourney, addStartJourneyInfo, addPrivacyPolicy, getPrivacyPolicy, editPrivacyPolicy, addAboutUs, getAboutUsInfo, editAboutUs, addContactUsInfo, getContactUsInfo, editContactUs, addBanner, editBanner, getBanner } = require('../../controllers/admin/admin.support.controller');

router.route('/admin/start-journey').post(adminAuthMiddleware, addStartJourneyInfo).get(adminAuthMiddleware, getStartJourney).patch(adminAuthMiddleware, editStartJourney);

router.route('/admin/privacy-policy').post(adminAuthMiddleware, addPrivacyPolicy).get(adminAuthMiddleware, getPrivacyPolicy).patch(adminAuthMiddleware, editPrivacyPolicy);

router.route('/admin/aboutus').post(adminAuthMiddleware, addAboutUs).get(adminAuthMiddleware, getAboutUsInfo).patch(adminAuthMiddleware, editAboutUs);

router.route('/admin/contactus').post(adminAuthMiddleware, addContactUsInfo).get(adminAuthMiddleware, getContactUsInfo).patch(adminAuthMiddleware, editContactUs);

router.route('/admin/banner').post(adminAuthMiddleware, upload.fields([{ name: 'banner', maxCount: 4 }]), addBanner).patch(adminAuthMiddleware, upload.fields([{ name: 'banner', maxCount: 4 }]), editBanner).get(adminAuthMiddleware, getBanner);

module.exports = router;
