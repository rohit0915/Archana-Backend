const createError = require('http-errors');

const CognitiveDistortion = require('../../models/cognitiveDistortion/cognitiveDistortion.model');
const ExcerciseCognitiveDistortion = require('../../models/cognitiveDistortion/excercizes/excercize.model');
const DistortionAnswer = require('../../models/cognitiveDistortion/distortionAnswer.model');
const User = require('../../models/user.model');   

exports.getAllDistortions = async (req,res,next) => {
    try {
        console.log('get all distortions by user');

        const {allLessonCompleted} = await User.findById(req.user).select('allLessonCompleted');
        
        if(!allLessonCompleted) return next(createError(400,'please complete all lessons first'));

        const requiredCognitive = await CognitiveDistortion.find().select('title description').sort({createdAt: -1});

        if(!requiredCognitive) return next(createError(400,'cannot get the distortions'))

        return res.status(200).json(requiredCognitive);

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errorName: error.name,
            message: error.message
        })
    }
}

exports.getDistortionById = async (req,res,next) => {
    try {
        console.log('hit user get cognitive distortion by id');

        const {allLessonCompleted} = await User.findById(req.user).select('allLessonCompleted');
        
        if(!allLessonCompleted) return next(createError(400,'please complete all lessons first'));

        const {distortionId} = req.params;

        const requiredDistortion = await CognitiveDistortion.findById(distortionId).populate('questions')

        if(!requiredDistortion) return next(createError(400,'cannot get the cognitive distortion'))

        return res.status(200).json(requiredDistortion)

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errorName: error.name,
            message: error.message
        })
    }
}

exports.updateDistortionUserProgress = async (req, res, next) => {
    try {
        console.log('Hit update user cognitive distortion progress');

        const { distortionId, percentCompleted } = req.body;

        if(!distortionId) return next(createError(400,'Please provide the distortion Id'));

        const user = await User.findById(req.user).select('congnitiveDistortionProgress');

        // console.log(user);

        const match = user.congnitiveDistortionProgress.some((item) => item.distortionId.toString() === distortionId);

        if (match) {
            const requiredProgress = user.congnitiveDistortionProgress.find((item) => item.distortionId.toString() === distortionId);

            requiredProgress.percentCompleted = percentCompleted;
            const progressUpdated = await user.save();

            if (!progressUpdated) return next(createError(400, 'cannot uodate the progress'))

            return res.status(200).json({
                message: 'progress successfully updated',
                progressUpdated
            })
        } else {
            user.congnitiveDistortionProgress.push({
                distortionId,
                percentCompleted
            })

            const progressUpdated = await user.save();
            if (!progressUpdated) return next(createError(400, 'cannot uodate the progress'))

            return res.status(200).json({
                message: 'progress successfully updated',
                progressUpdated
            })
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errorName: error.name,
            message: error.message
        })
    }
}


exports.getDistortionProgress = async (req, res, next) => {
    try {
        console.log('hit get the cognitive distortion progress by distortion id');

        const { distortionId } = req.params;
        const user = await User.findById(req.user).select('congnitiveDistortionProgress');

        // console.log(user);
        const [match] = user.congnitiveDistortionProgress.filter((item) => item.distortionId.toString() === distortionId);

        if (match) {
           
            return res.status(200).json(match);
        } else {
            return res.status(200).json({
                distortionId,
                percentCompleted: 0
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errorName: error.name,
            message: error.message
        })
    }
}

exports.addAnswerToDistortionQuestion = async (req,res,next) => {
    try {
        console.log('hit user add answer to distortion question');
        const {distortionId,distortionQuestionId,answer} = req.body;

        const newAnswer = await DistortionAnswer.create({
            answerBy: req.user,
            distortionQuestionId,
            distortionId,
            answer
        })

        if(!newAnswer) return next(createError(400,'cannot save the answer'));

        return res.status(200).json(newAnswer);

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errorName: error.name,
            message: error.message
        })
    }
}

exports.getDistortionExcercize = async (req,res,next) => {
    try {
        console.log('hit user get cognitive distortion excercize');

        const requiredExcercize = await ExcerciseCognitiveDistortion.find({});

        if(!requiredExcercize) return next(createError(400,'cannot get the excercize'));

        return res.status(200).json(requiredExcercize);
    
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errorName: error.name,
            message: error.message
        })
    }
}