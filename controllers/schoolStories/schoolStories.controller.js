const createError = require('http-errors');

const SchoolStory = require('../../models/schoolStories/school.story.model');
const SchoolTimeStoryQuestion = require('../../models/schoolStories/question.model');
const SchoolTimeStoryAnswer = require('../../models/schoolStories/answer.model');
const User = require('../../models/user.model');


exports.getAllSchoolStories = async (req, res, next) => {
    try {
        console.log('hit get all school stories by user');

        const stories = await SchoolStory.find({});

        if (stories) {
            return res.status(200).json({
                stories
            })
        } else {
            return next(createError(400, 'cannot get the stories'))
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errorName: error.name,
            message: error.message
        })
    }
}


exports.getSchoolStoriesById = async (req, res, next) => {
    try {
        console.log('hit get school story by Id by user user');

        const { schoolTimeStoryId } = req.params;

        const story = await SchoolStory.findById(schoolTimeStoryId).populate('questions');

        if (story) {
            return res.status(200).json({
                story
            })
        } else {
            return next(createError(400, 'cannot get the story'))
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errorName: error.name,
            message: error.message
        })
    }
}

exports.addAnswerToStoryQuestion = async (req, res, next) => {
    try {
        console.log('hit user answer the school time story question');

        const { schoolStoryId, schoolStoryQuestionId, answer } = req.body;

        const givenAnswer = await SchoolTimeStoryAnswer.create({
            answeredBy: req.user,
            question: schoolStoryQuestionId,
            answer,
            schoolTimeStory: schoolStoryId

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

exports.updateSchoolStoryUserProgress = async (req, res, next) => {
    try {
        console.log('Hit update user school story progress');

        const { schoolStoryId, percentCompleted } = req.body;

        const user = await User.findById(req.user).select('schoolStoryProgress');

        // console.log(user);

        const match = user.schoolStoryProgress.some((item) => item.schoolStoryId.toString() === schoolStoryId);

        if (match) {
            const requiredProgress = user.schoolStoryProgress.find((item) => item.schoolStoryId.toString() === schoolStoryId);

            requiredProgress.percentCompleted = percentCompleted;
            const progressUpdated = await user.save();

            if (!progressUpdated) return next(createError(400, 'cannot uodate the progress'))

            return res.status(200).json({
                message: 'progress successfully updated',
                progressUpdated
            })
        } else {
            user.schoolStoryProgress.push({
                schoolStoryId,
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

exports.getSchoolTimeStoryProgress = async (req, res, next) => {
    try {
        console.log('hit get the story progress by story id');

        const { schoolTimeStoryId } = req.params;
        const user = await User.findById(req.user).select('schoolStoryProgress');

        // console.log(user);

        const [match] = user.schoolStoryProgress.filter((item) => item.schoolStoryId.toString() === schoolTimeStoryId);

        if (match) {
            return res.status(200).json(match);
        } else {
            return res.status(200).json({
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