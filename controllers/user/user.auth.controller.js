const createError = require('http-errors');

const User = require('../../models/user.model');

const { genToken } = require('../../middlewares/jwt');

const Diary = require('../../models/diary/diary.model');

exports.userSignUp = async (req, res, next) => {
    try {

        console.log('hit user sign up');

        const { email, password } = req.body;
        const mobile = req.body.mobile || '';

        const newUser = new User({
            name: email.split('@')[0],
            mobile,
            email
        })

        newUser.password = await newUser.genPassword(password);

        const registeredUser = await newUser.save({ validateBeforeSave: false });

        if (!registeredUser) return next(createError(400, 'cannot register the user'))

        const token = await genToken(registeredUser._id);

        if (token) {

            return res.status(201).json({
                message: 'you are registered successfully',
                token,
                registeredUser
            })

        } else {
            return next(createError(400, 'cannot get the token'));
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errorName: error.name,
            message: error.message
        })
    }
}


exports.userLogin = async (req, res, next) => {
    try {
        console.log('hit user login');
        const { email, password } = req.body;

        const loggingInUser = await User.findOne({ email: email }).select('+password');

        if (loggingInUser && loggingInUser.checkPassword(password, loggingInUser.password)) {
            const token = await genToken(loggingInUser._id);

            let isHavingDiary;
            let reasonForNotCreatingDiary = null;
            if (await Diary.findOne({diaryIsOfUser: loggingInUser._id, date: new Date().toLocaleDateString()}) && loggingInUser.numLessonCompleted >= 2  ) {
                isHavingDiary = true;
            } else {
                isHavingDiary= false;

                if (loggingInUser.numLessonCompleted >= 2) {
                    await Diary.create({
                        diaryIsOfUser : loggingInUser._id
                    });
                } else {
                    reasonForNotCreatingDiary = "user not completed the 2 lessons";    
                }
            }
            if (token) {
                return res.status(200).json({
                    token,
                    isHavingDiary,
                    reasonForNotCreatingDiary
                })
            } else {
                return next(createError(400, 'cannot generate the token'))
            }

        } else {
            return next(createError(400, 'Incorrect email or password'))

        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errorName: error.name,
            message: error.message
        })
    }
}