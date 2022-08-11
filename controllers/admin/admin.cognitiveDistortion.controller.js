const createError = require('http-errors');

const CognitiveDistortion = require('../../models/cognitiveDistortion/cognitiveDistortion.model');
const DistortionQuestion = require('../../models/cognitiveDistortion/distortionQuestion.model');
const ExcerciseCognitiveDistortion = require('../../models/cognitiveDistortion/excercizes/excercize.model')

exports.addDistortion = async (req,res,next) => {
    try {
        console.log('hit admin add cognitive distortion');

        const {title, media,description,introduction,story, questions,explanation,strategies} = req.body;

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

        const questionsArray = questions.map((item)=>{
            return {
                distortion : newCognitiveDistortion._id,
                question: item.question,
                options: item.options,
                answer: item.answer
            }
        })

        const questionPromise = await DistortionQuestion.create(questionsArray);

        const questionIds = questionPromise.map((item)=> item._id);

        newCognitiveDistortion.questions = questionIds;

        const savedDistortion = await newCognitiveDistortion.save();

        if(!savedDistortion) return next(createError(400,'cannot save the distortion'));

        
        return res.status(200).json(savedDistortion);

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errorName: error.name,
            message: error.message
        })
    }
}

exports.addDistortionExcercize = async (req,res,next) => {
    try {
        console.log('hit add distortion excercize by admin');
        // console.log(req.body);

        const {pattern,matchTheColumn1,matchTheColumn2,multipleChoiceQuestions} = req.body;
        
        const excercize = new ExcerciseCognitiveDistortion({
            pattern,
            matchTheColumn1,
            matchTheColumn2,
            multipleChoiceQuestions
        })

        const savedExcercize = await excercize.save();

        if(!savedExcercize) return next(createError(400,'cannot save the excercize'))

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