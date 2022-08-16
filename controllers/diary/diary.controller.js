const createError = require('http-errors');

const Diary = require('../../models/diary/diary.model');
const User = require('../../models/user.model');

exports.getDiary = async (req, res, next) => {
    try {
        console.log('get diary of user');

        const requiredDiary = await Diary.findOne({ diaryIsOfUser: req.user, date: new Date().toLocaleDateString() });

        if (!requiredDiary) return next(createError(400, 'cannot get the diary'));

        return res.status(200).json(requiredDiary)

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errorName: error.name,
            message: error.message
        })
    }
}

exports.addFeeling = async (req, res, next) => {
    try {
        console.log('add feeling');

        const { feeling } = req.body;

        const requiredDiary = await Diary.findOne({ diaryIsOfUser: req.user, date: new Date().toLocaleDateString() });

        // const match = requiredDiary.feelings.some((item)=> item === feeling);

        // if(match) return next(createError(400,'feeling already exists'));

        requiredDiary.feelings.push(feeling);

        const savedDiary = await requiredDiary.save();

        if (!savedDiary) return next(createError(400, 'cannot update diary'));

        return res.status(200).json(savedDiary)

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errorName: error.name,
            message: error.message
        })
    }
}

exports.editDiary = async (req, res, next) => {
    try {
        console.log('hit edit diary of user');
        const { situation, thought, behaviour, thoughtsHelpfulFromBody, thoughtsWholesomeFromBody, distortionFromBody } = req.body;

        const user = await User.findById(req.user);

        let thoughtsHelpfulToBeSaved, thoughtsWholesomeToBeSaved, distortionToBeSaved;

        if (user.numLessonCompleted >= 6) {
            thoughtsHelpfulToBeSaved = thoughtsHelpfulFromBody,
            thoughtsWholesomeToBeSaved = thoughtsWholesomeFromBody, 
            distortionToBeSaved = distortionFromBody
        }

        const updatedDiary = await Diary.findOneAndUpdate({ diaryIsOfUser: req.user, date: new Date().toLocaleDateString() }, {
            $push: { situation: situation, thoughts: thought, behaviours: behaviour },
            thoughtsHelpful:thoughtsHelpfulToBeSaved,
            thoughtsWholesome:thoughtsWholesomeToBeSaved,
            distortion:distortionToBeSaved
        }, { new: true });

        if (!updatedDiary) return next(createError(400, 'cannot update the diary'))

        return res.status(200).json(updatedDiary);

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errorName: error.name,
            message: error.message
        })
    }
}