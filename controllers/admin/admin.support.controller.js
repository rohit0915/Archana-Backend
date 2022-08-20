const createError = require('http-errors');


const StartJourney = require('../../models/support/startJourneyTogether.model');
const PrivacyPolicy = require('../../models/support/privacyPolicy.model');
const About = require('../../models/support/aboutUs.model');
const ContactUs = require('../../models/support/contactUs.model');
const Banner = require('../../models/support/banner.model');

/*
    START JOURNEY ROUTES 
*/

exports.getStartJourney = async (req, res, next) => {
    try {
        console.log('admin get the start journey');

        const startJourney = await StartJourney.findOne();

        if (!startJourney) return next(createError(400, 'cannot get the data'));

        return res.status(200).json(startJourney);

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errorName: error.name,
            message: error.message
        })
    }
}

exports.editStartJourney = async (req, res, next) => {
    try {
        console.log('hit admin adit start journey info');

        if (Object.keys(req.body).length === 0) return next(createError(400, 'empty body received'));

        const { heading1, heading2, content1, content2 } = req.body;

        const update = {
            heading1,
            heading2,
            content1,
            content2
        }

        const updated = await StartJourney.findOneAndUpdate({}, update, { new: true, runValidators: true });

        if (!updated) return next(createError(400, 'cannot update the start journey info'));

        return res.status(200).json(updated)

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errorName: error.name,
            message: error.message
        })
    }
}

exports.addStartJourneyInfo = async (req, res, next) => {
    try {
        console.log('hit admin add start journey info');

        if (Object.keys(req.body).length === 0) return next(createError(400, 'empty body received'));

        const { heading1, heading2, content1, content2 } = req.body;

        if (await StartJourney.findOne()) return next(createError(400, 'please update the existing start journey doc'));

        const newStartJourneyDoc = await StartJourney.create({
            heading1,
            heading2,
            content1,
            content2
        })

        if (!newStartJourneyDoc) return next(createError(400, 'cannot add the start journey data'));

        return res.status(200).json(newStartJourneyDoc);

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errorName: error.name,
            message: error.message
        })
    }
}

/*
    START JOURNEY ROUTES ENDS 
*/



/*
    PRIVACY POLICY ROUTES 
*/

exports.addPrivacyPolicy = async (req, res, next) => {
    try {
        console.log('hit admin add privacy policy');

        if (Object.keys(req.body).length === 0) return next(createError(400, 'empty body received'));

        const { heading, content } = req.body;

        if (await PrivacyPolicy.findOne()) return next(createError(400, 'please update the existing privacy policy doc'));

        const newPrivacyPolicy = await PrivacyPolicy.create({
            heading,
            content
        })

        if (!newPrivacyPolicy) return next(createError(400, 'cannot add the privacy policy data'));

        return res.status(200).json(newPrivacyPolicy);

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errorName: error.name,
            message: error.message
        })
    }
}


exports.getPrivacyPolicy = async (req, res, next) => {
    try {
        console.log('admin get the privacy policy');

        const privacyPolicy = await PrivacyPolicy.findOne();

        if (!privacyPolicy) return next(createError(400, 'cannot get the data'));

        return res.status(200).json(privacyPolicy);

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errorName: error.name,
            message: error.message
        })
    }
}

exports.editPrivacyPolicy = async (req, res, next) => {
    try {
        console.log('hit admin edit privacy policy');

        if (Object.keys(req.body).length === 0) return next(createError(400, 'empty body received'));

        const { heading, content } = req.body;

        const update = {
            heading,
            content
        }

        const updated = await PrivacyPolicy.findOneAndUpdate({}, update, { new: true, runValidators: true });

        if (!updated) return next(createError(400, 'cannot update the privacy policy info'));

        return res.status(200).json(updated)

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errorName: error.name,
            message: error.message
        })
    }
}

/*
   PRIVACY POLICY ROUTES ENDS 
*/


/*
    ABOUT US ROUTES 
*/

exports.addAboutUs = async (req, res, next) => {
    try {
        console.log('hit admin add the about us info');

        if (Object.keys(req.body).length === 0) return next(createError(400, 'empty body received'));

        const { heading, content } = req.body;

        if (await About.findOne()) return next(createError(400, 'please update the existing about info'))

        const newAboutInfo = await About.create({
            heading,
            content
        })

        if (!newAboutInfo) return next(createError(400, 'cannot add about info'));

        return res.status(200).json(newAboutInfo);

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errorName: error.name,
            message: error.message
        })
    }
}

exports.getAboutUsInfo = async (req, res, next) => {
    try {
        console.log('hit admin get about us info');

        const aboutInfo = await About.findOne();

        if (!aboutInfo) return next(createError(400, 'cannot get the about us info'));

        return res.status(200).json(aboutInfo);

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errorName: error.name,
            message: error.message
        })
    }
}

exports.editAboutUs = async (req, res, next) => {
    try {
        console.log('hit admin edit the about us info');

        if (Object.keys(req.body).length === 0) return next(createError(400, 'empty body received'));

        const { aboutUs } = req.body;

        const update = {
            aboutUs
        }

        const updated = await About.findOneAndUpdate({}, update, { new: true, runValidators: true });

        if (!updated) return next(createError(400, 'cannot update the About info'));

        return res.status(200).json(updated);

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errorName: error.name,
            message: error.message
        })
    }
}

/*
    ABOUT US ROUTES ENDS 
*/



/*
    CONTACTUS ROUTES 
*/
exports.addContactUsInfo = async (req, res, next) => {
    try {
        console.log('hit admin add contact us info');

        if (Object.keys(req.body).length === 0) return next(createError(400, 'empty body received'));

        if (await ContactUs.findOne()) return next(createError(400, 'please update the existing data'));

        const { mobile, whatsapp, mail } = req.body;

        const newContactInfo = await ContactUs.create({
            mobile,
            whatsapp,
            mail
        });

        if (!newContactInfo) return next(createError(400, 'cannot add the contact us info'))

        return res.status(200).json(newContactInfo);

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errorName: error.name,
            message: error.message
        })
    }
}


exports.getContactUsInfo = async (req, res, next) => {
    try {
        console.log('hit admin get contact us info');

        const contactUsInfo = await ContactUs.findOne();

        if (!contactUsInfo) return next(createError(400, 'cannot get the contact us info'));

        return res.status(200).json(contactUsInfo);

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errorName: error.name,
            message: error.message
        })
    }
}


exports.editContactUs = async (req, res, next) => {
    try {
        console.log('hit admin edit the contact us info');

        if (Object.keys(req.body).length === 0) return next(createError(400, 'empty body received'));

        const { mobile, whatsapp, mail } = req.body;

        const update = {
            mobile,
            whatsapp,
            mail
        }

        const updated = await ContactUs.findOneAndUpdate({}, update, { new: true, runValidators: true });

        if (!updated) return next(createError(400, 'cannot update the contact info'));

        return res.status(200).json(updated);

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errorName: error.name,
            message: error.message
        })
    }
}

/*
    CONTACTUS ROUTES ENDS 
*/


/*
    BANNER ROUTES 
*/

exports.addBanner = async (req, res, next) => {
    try {
        console.log('hit admin add banner');

        if (req.files.banner.length === 0) return next(createError(400, 'please provide the banner images'));

        if (await Banner.findOne({})) return next(createError(400, 'a banner already exists please update the existing one'));

        const pathArray = req.files.banner.map((item) => {
            return `${item.destination}/${item.filename}`
        })

        const newBanner = await Banner.create({
            images: pathArray
        });

        if (!newBanner) return next(createError(400, 'cannot add the new banner'));

        return res.status(200).json(newBanner);


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errorName: error.name,
            message: error.message
        })
    }
}

exports.editBanner = async (req, res, next) => {
    try {
        console.log('hit admin edit the banner');
      
        if (req.files.banner.length === 0) return next(createError(400, 'please provide the banner images'));

        const pathArray = req.files.banner.map((item) => {
            return `${item.destination}/${item.filename}`
        })

        const updated = await Banner.findOneAndUpdate({}, {
            images: pathArray
        }, { new: true });

        if (!updated) return next(createError(400, 'cannot update the banner'));

        return res.status(200).json(updated);

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errorName: error.name,
            message: error.message
        })
    }
}

exports.getBanner = async (req,res,next) => {
    try {
        console.log('hit admin get banner');

        const r = undefined;

        const banner = await Banner.findOne({});

        if(!banner) return next(createError(400,'cannot get the banner'));

        return res.status(200).json(banner);

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errorName: error.name,
            message: error.message
        })
    }
}

/*
    BANNER ROUTES ENDS 
*/