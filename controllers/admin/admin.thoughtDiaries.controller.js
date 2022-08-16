const createError = require('http-errors');

const Diary = require('../../models/diary/diary.model');

exports.getAllThoughtDiariesOfUser = async (req, res, next) => {
    try {
        console.log('admin get thought diaries of the user');

        if(Object.keys(req.body).length === 0) return next(createError(400,'empty body received'));

        const {userId} = req.body;

        const diaries = await Diary.find({ diaryIsOfUser: userId }).sort({ createdAt: -1 });

        if (!diaries) return next(createError(400, 'cannot get the diaries'));

        return res.status(200).json(diaries);

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errorName: error.name,
            message: error.message
        })
    }
}