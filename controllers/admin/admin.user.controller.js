const createError = require('http-errors');

const User = require('../../models/user.model');
const SchoolTimeStoryAnswer = require('../../models/schoolStories/answer.model');
const LessonAnswer = require('../../models/lesson/lesson.answer.model');

exports.getAllUsers = async (req, res, next) => {
    try {
        console.log('hit get all users by Admin');

        const users = await User.find({});

        if (!users) return next(createError(400, 'cannot get the users'));

        return res.status(200).json(users);


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errorName: error.name,
            message: error.message
        })
    }
}

exports.getUserById = async (req, res, next) => {
    try {
        console.log('hit admin get user by id');

        const { userId } = req.params;

        const requiredUser = await User.findById(userId).populate({
            path: 'schoolStoryProgress.schoolStoryId',
            select: 'title description'
        }).populate({
            path: 'lessonProgress.lessonId',
            select: 'title description'
        }).populate({
            path: 'congnitiveDistortionProgress.distortionId',
            select: 'title description'
        })


        if (!requiredUser) return next(createError(400, 'cannot get the user'));

        return res.status(200).json(requiredUser);

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errorName: error.name,
            message: error.message
        })
    }
}

exports.deleteUserById = async (req, res, next) => {
    try {
        console.log('hit admin delete a user');

        const { userId } = req.params;

        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) return next(createError(400,'cannot delete the data'));
        
        return res.status(200).json({
            message: 'deletion successfull'
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errorName: error.name,
            message: error.message
        })
    }
}

exports.getAllAnswerOnSchoolstoryByUser = async (req,res,next) => {
    try {
        console.log('hit get all answer by user on the school time story');

        const {schoolTimeStoryId,userId} = req.body;

        const requiredAnswers = await lessonAnswer.find({
            answeredBy: userId,
            schoolTimeStory:schoolTimeStoryId
        }).populate('question');

        if(!requiredAnswers) return next(createError(400,'cannot get the answers'));

        return res.status(200).json(requiredAnswers);


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errorName: error.name,
            message: error.message
        })
    }
}


exports.getAllAnswerOnLessonByUser = async (req,res,next) => {
    try {
        console.log('hit get all answer by user on the lesson');

        const {lessonId,userId} = req.body;

        const requiredAnswers = await SchoolTimeStoryAnswer.find({
            answeredBy: userId,
            lessonId:lessonId
        }).populate('question');

        if(!requiredAnswers) return next(createError(400,'cannot get the answers'));

        return res.status(200).json(requiredAnswers);


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errorName: error.name,
            message: error.message
        })
    }
}