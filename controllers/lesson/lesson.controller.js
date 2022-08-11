const createError = require('http-errors');
const Lesson = require('../../models/lesson/lesson.model');
const LessonAnswer = require('../../models/lesson/lesson.answer.model');
const User = require('../../models/user.model');

exports.getAllLessons = async (req, res, next) => {
    try {
        console.log('user get all lessons');
        const lessons = await Lesson.find().select('title description')

        if (!lessons) return next(createError(400, 'cannot get the lessons'));

        return res.status(200).json({
            lessons
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errorName: error.name,
            message: error.message
        })
    }
}


exports.getLessonById = async (req, res, next) => {
    try {

        console.log('user get lesson by id');
        const { lessonId } = req.params;


        const requiredLesson = await Lesson.findById(lessonId).populate('questions.storyQuestions').populate('questions.testUnderstandingQuestions').populate('questions.practiceQuestions')

        if (requiredLesson) {
            return res.status(200).json({
                requiredLesson
            })
        } else {
            return next(createError(404, 'lesson not found'))
        }


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errorName: error.name,
            message: error.message
        })
    }
}


exports.addAnswerToLessonQuestion = async (req, res, next) => {
    try {
        console.log('hit user answer the lesson question');

        const { lessonId, lessonQuestionId, answer } = req.body;

        const givenAnswer = await LessonAnswer.create({
            answeredBy: req.user,
            question: lessonQuestionId,
            answer,
            lessonId

        })

        if (givenAnswer) {
            return res.status(200).json({
                message: "answer successfully added",
                givenAnswer
            })
        } else {
            return next(createError(400, 'cannot add answer '))
        }


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errorName: error.name,
            message: error.message
        })
    }
}


exports.updateLessonUserProgress = async (req, res, next) => {
    try {
        console.log('Hit update user lesson progress');

        const { lessonId, percentCompleted } = req.body;

        const user = await User.findById(req.user).select('lessonProgress');

        // console.log(user);

        const match = user.lessonProgress.some((item) => item.lessonId.toString() === lessonId);

        if (match) {
            const requiredProgress = user.lessonProgress.find((item) => item.lessonId.toString() === lessonId);

            requiredProgress.percentCompleted = percentCompleted;
            const progressUpdated = await user.save();

            if (!progressUpdated) return next(createError(400, 'cannot uodate the progress'))

            return res.status(200).json({
                message: 'progress successfully updated',
                progressUpdated
            })
        } else {
            user.lessonProgress.push({
                lessonId,
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

exports.getLessonProgress = async (req, res, next) => {
    try {
        console.log('hit get the story progress by lesson id');

        const { lessonId } = req.params;
        const user = await User.findById(req.user).select('lessonProgress');

        // console.log(user);
        const [match] = user.lessonProgress.filter((item) => item.lessonId.toString() === lessonId);

        if (match) {
           
            return res.status(200).json(match);
        } else {
            return res.status(200).json({
                lessonId,
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

exports.completedAllLessons = async (req,res,next) => {
    try {
        console.log('hit completed all lessons');

        const user = await User.findById(req.user);

        if (user.numLessonCompleted >= 8 && user.allLessonCompleted === false) {
            user.allLessonCompleted = true;
            await user.save({validateBeforeSave: false});

            return res.status(200).json({
                message: `congrats ${user.email}, you successfully cmpleted all lessons `
            })
        }else{
            return next(createError(400,'please complete all lessons first and do remember to rate all the lessons after completion'));
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errorName: error.name,
            message: error.message
        })
    }
}