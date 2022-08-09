const createError = require('http-errors');

const Rating = require('../../models/rating/rating.model');
const User = require('../../models/user.model');

exports.addRating = async (req, res, next) => {
    try {
        console.log('hit add rating on lesson by user');

        const { lessonId, tags, rating, body } = req.body;

        const alreadyExistedRating = await Rating.findOne({ lessonId: lessonId, ratingBy: req.user });

        let progress;

        if (alreadyExistedRating) {
            progress = 'lesson already completed '
        } else {
            progress = await User.findByIdAndUpdate(req.user, {
                $inc: { numLessonCompleted: 1 }
            }, { new: true }).select('numLessonCompleted');

        }

        const newRating = await Rating.create({
            lessonId,
            ratingBy: req.user,
            tags,
            rating,
            body
        })

        if (!newRating) return next(createError(400, 'cannot save the rating'));

        return res.status(200).json({
            newRating,
            progress
        })

    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errorName: error.name,
            message: error.message
        })
    }
}