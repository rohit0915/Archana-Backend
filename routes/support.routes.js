const express = require('express');
const router = express.Router();

const {getStartJourney,getPrivacyPolicy,getAbout, getContactUs, getBanner} = require('../controllers/support.contollers');

router.route('/startJourney').get(getStartJourney);
router.route('/privacy-policy').get(getPrivacyPolicy);
router.route('/about').get(getAbout);
router.route('/contact').get(getContactUs);
router.route('/banner').get(getBanner);


module.exports = router;
