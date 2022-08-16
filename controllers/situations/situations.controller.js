const createError = require('http-errors');

const Situation = require('../../models/situations/situations.model');

exports.getAllSituations = async (req,res,next) => {
    try {
        console.log('hit get all situations');

        const situations = await Situation.find().populate({
            path: 'distortionId',
            select: 'title description'
        }).sort({createdAt: -1});

        if(!situations) return next(createError(400,'cannot get the situation data'));

        return res.status(200).json(situations);

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errorName: error.name,
            message: error.message
        })
    }
}