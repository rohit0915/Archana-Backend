const createError = require('http-errors');

const User = require('../../models/user.model');

exports.getCurrentUser = async (req, res, next) => {
    try {
        console.log('hit get current logged in user');

        const currentUser = await User.findById(req.user).populate({
            path: 'lessonProgress.lessonId',
            select: 'title'
        }).populate({
            path: 'congnitiveDistortionProgress.distortionId',
            select: 'title'
        }).populate({
            path: 'schoolStoryProgress.schoolStoryId',
            select: 'title'
        });

        return res.status(200).json({
            currentUser
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errorName: error.name,
            message: error.message
        })
    }
}

exports.updateUserDetails = async (req, res, next) => {
    try {
        console.log('hit update user details');
        const { age, gender, mood } = req.body;

        const update = {
            age,
            gender,
            mood
        }

        const updatedUser = await User.findByIdAndUpdate(req.user, update, { new: true });

        if (updatedUser) {
            return res.status(200).json({
                updatedUser
            })
        } else {
            return next(createError(400, 'cannot update the location'))
        }


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errorName: error.name,
            message: error.message
        })
    }
}

exports.saveCurrentLocation = async (req, res, next) => {
    try {
        console.log('hit save current location');
        let { latLng } = req.body;
        latLng = latLng.trim();

        let [lat,lng] = latLng.split(',');

        const update = {
            currentLocation: {
                type: 'Point',
                coordinates: [Number(lat),Number(lng)]
            }
        }

        const updatedUser = await User.findByIdAndUpdate(req.user, update, { new: true });

        if (updatedUser) {
            return res.status(200).json({
                updatedUser
            })
        } else {
            return next(createError(400, 'cannot update the location'))
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errorName: error.name,
            message: error.message
        })
    }
}


exports.editUserDetails = async (req, res, next) => {
    try {
        console.log('hit user edit details');

        const {name,email,gender,age} = req.body;

        const profilePath = `${req.file.destination}/${req.file.filename}`;
        if(!profilePath) return next(createError(400,'please provide the profie image'));

        const updatedUser = await User.findByIdAndUpdate(req.user,{
            name,
            email,
            gender,
            age,
            profileImage:profilePath
        },{new: true});

        if(!updatedUser) return next(createError(400,'cannot update the data'));

        return res.status(200).json(updatedUser);

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errorName: error.name,
            message: error.message
        })
    }
}