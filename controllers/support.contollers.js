const createError = require('http-errors');

const StartJourney = require('../models/support/startJourneyTogether.model');
const PrivacyPolicy = require('../models/support/privacyPolicy.model');
const About = require('../models/support/aboutUs.model');
const ContactUs = require('../models/support/contactUs.model');
const Banner = require('../models/support/banner.model');

exports.getStartJourney = async (req, res, next) => {
    try {
        console.log('get let"s start journey together ');

        const data = await StartJourney.findOne({});

        if (data) {
            return res.status(200).json({
                data
            })
        } else {
            return next(createError(400, 'cannot get the data'))
        }

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
        console.log('get privacy policy ');

        const data = await PrivacyPolicy.findOne({});

        if (data) {
            return res.status(200).json({
                data
            })
        } else {
            return next(createError(400, 'cannot get the data'))
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errorName: error.name,
            message: error.message
        })
    }
}

exports.getAbout = async (req, res, next) => {
    try {
        console.log('hit get about info by user');

        const about = await About.findOne();

        if (!about) return next(createError(400, 'cannot get the about'));

        return res.status(200).json(about);

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errorName: error.name,
            message: error.message
        })
    }
}


exports.getContactUs = async (req, res, next) => {
    try {
        console.log('hit get contact info by user');

        const contact = await ContactUs.findOne();

        if (!contact) return next(createError(400, 'cannot get the contact info'));

        return res.status(200).json(contact);

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errorName: error.name,
            message: error.message
        })
    }
}

exports.getBanner = async (req, res, next) => {
    try {
        console.log('hit get banner');

        const banner = await Banner.findOne({});

        if (!banner) return next(createError(400, 'cannot get the banner data'));

        return res.status(200).json(banner);

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errorName: error.name,
            message: error.message
        })
    }
}

