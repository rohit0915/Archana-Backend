const createError = require('http-errors');

const Situation = require('../../models/situations/situations.model');

exports.addSituation = async (req, res, next) => {
    try {
        console.log('admin add situations');

        const { distortionId, title, points } = req.body;

        const newSituation = new Situation({
            distortionId, title, points
        })

        const savedSituations = await newSituation.save();

        if (!savedSituations) return next(createError(400, 'cannot save the situation'))

        return res.status(200).json(savedSituations);


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errorName: error.name,
            message: error.message
        })
    }
}

exports.getAllSituations = async (req, res, next) => {
    try {
        console.log('hit admin get all situations');

        const situations = await Situation.find({}).populate({
            path: 'distortionId',
            select: 'title description'
        }).sort({createdAt : -1});

        if (!situations) return next(createError(400, 'cannot get the situations'));

        return res.status(200).json(situations);

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errorName: error.name,
            message: error.message
        })
    }
}

exports.editSituation = async (req, res, next) => {
    try {
        console.log('hit edit the situation by admin');

        const { situationId } = req.params;

        if (Object.keys(req.body).length === 0) return next(createError(400, 'empty body received'));

        const { title, points } = req.body;

        const update = {
            title,
            points
        }

        const updated = await Situation.findByIdAndUpdate(situationId, update, { new: true, runValidators: true });

        if (!updated) return next(createError(400, 'cannot update the situation'))

        return res.status(200).json(updated);


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errorName: error.name,
            message: error.message
        })
    }
}

exports.deleteSituation = async (req, res, next) => {
    try {
        console.log('hit admin delete the situation by id');

        const { situationId } = req.params;

        const deleted = await Situation.findByIdAndDelete(situationId);

        if (!deleted) return next(createError(400, 'cannot delete the situation'));

        return res.status(200).json({ message: 'deletion successfull' });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errorName: error.name,
            message: error.message
        })
    }
}