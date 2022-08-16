const createError = require('http-errors');

const CognitiveDistortion = require('../../models/cognitiveDistortion/cognitiveDistortion.model');
const DistortionQuestion = require('../../models/cognitiveDistortion/distortionQuestion.model');
const ExcerciseCognitiveDistortion = require('../../models/cognitiveDistortion/excercizes/excercize.model')

exports.addDistortion = async (req, res, next) => {
    try {
        console.log('hit admin add cognitive distortion');

        const { title, media, description, introduction, story, questions, explanation, strategies } = req.body;

        // console.log(title, onScreen,description,introduction,story, questions,explanation,strategies);

        const newCognitiveDistortion = new CognitiveDistortion({
            title,
            media,
            description,
            introduction,
            story,
            explanation,
            strategies
        })

        const questionsArray = questions.map((item) => {
            return {
                distortion: newCognitiveDistortion._id,
                question: item.question,
                options: item.options,
                answer: item.answer
            }
        })

        const questionPromise = await DistortionQuestion.create(questionsArray);

        const questionIds = questionPromise.map((item) => item._id);

        newCognitiveDistortion.questions = questionIds;

        const savedDistortion = await newCognitiveDistortion.save();

        if (!savedDistortion) return next(createError(400, 'cannot save the distortion'));


        return res.status(200).json(savedDistortion);

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errorName: error.name,
            message: error.message
        })
    }
}

exports.getAllCognitiveDistortion = async (req, res, next) => {
    try {
        console.log('hit admin get all cognitive distortions');

        const distortions = await CognitiveDistortion.find({}).select('title description');

        if (!distortions) return next(createError(400, 'cannot get the cognitive distortions'));

        return res.status(200).json(distortions);

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errorName: error.name,
            message: error.message
        })
    }
}

exports.getCognitiveDistortionById = async (req, res, next) => {
    try {
        console.log('admin hit get cognitive distortion by id');

        const { distortionId } = req.params;

        const requiredDistortion = await CognitiveDistortion.findById(distortionId).populate('questions');

        if (!requiredDistortion) return next(createError(400, 'cannot find the cognitive distortion'));

        return res.status(200).json(requiredDistortion);

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errorName: error.name,
            message: error.message
        })
    }
}

exports.editCognitiveDistortionById = async (req, res, next) => {
    try {
        console.log('hit admin edit cognitive distortion by id');

        const { distortionId } = req.params;

        if (Object.keys(req.body).length === 0) return next(createError(400, 'empty body received'))

        const { title, description, media } = req.body;

        const update = {
            title,
            description,
            media
        }

        const updated = await CognitiveDistortion.findByIdAndUpdate(distortionId, update, { new: true, runValidators: true });

        if (!updated) return next(createError(400, 'cannot update the cognitive distortion'));

        return res.status(200).json(updated);

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errorName: error.name,
            message: error.message
        })
    }
}

exports.deleteCognitiveDistortionById = async (req, res, next) => {
    try {
        console.log('hit admin delete cognitive distotion by id');

        const { distortionId } = req.params;

        const deleted = await CognitiveDistortion.findByIdAndDelete(distortionId);

        if (!deleted) return next(createError(400, 'cannot delete the cognitive distrortion'));

        return res.status(200).json({ message: 'deletion successfull' });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errorName: error.name,
            message: error.message
        })
    }
}

/*
    COGNITIVE DISTORTION EXCERCISE
*/

exports.addDistortionExcercize = async (req, res, next) => {
    try {
        console.log('hit add distortion excercize by admin');
        // console.log(req.body);

        const { pattern, matchTheColumn1, matchTheColumn2, multipleChoiceQuestions } = req.body;

        const excercize = new ExcerciseCognitiveDistortion({
            pattern,
            matchTheColumn1,
            matchTheColumn2,
            multipleChoiceQuestions
        })

        const savedExcercize = await excercize.save();

        if (!savedExcercize) return next(createError(400, 'cannot save the excercize'))

        return res.status(200).json({
            message: "excercize saved successfully",
            savedExcercize
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errorName: error.name,
            message: error.message
        })
    }
}

exports.getAllCognitiveDistortionExcercize = async (req, res, next) => {
    try {
        console.log('hit admin get all distortion excercise');

        const excercize = await ExcerciseCognitiveDistortion.find({});

        if (!excercize) return next(createError(400, 'cannot get the distortion excercizes'));

        return res.status(200).json(excercize);

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errorName: error.name,
            message: error.message
        })
    }
}

exports.deleteDistortionExcercizeById = async (req, res, next) => {
    try {
        console.log('hit admin delete distortion excercize by id ');

        const { excercizeId } = req.params;

        const deleted = await ExcerciseCognitiveDistortion.findByIdAndDelete(excercizeId);

        if (!deleted) return next(createError(400, 'cannot delete the lesson'));

        return res.status(200).json({ message: 'deletion successfull' });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errorName: error.name,
            message: error.message
        })
    }
}