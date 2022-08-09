const createError = require('http-errors');

const User = require('../../models/user.model');

exports.getPhq9Result = async (req, res, next) => {
    try {
        console.log('hit get phq 9 result');

        const result = await User.findById(req.user).select('phq9Result');

        if (result) {
            return res.status(200).json({
                result
            })
        } else {
            return next(createError(400, 'cannot get the phq9 result'))
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errorName: error.name,
            message: error.message
        })
    }
}

exports.updatePhq9Result = async (req, res, next) => {
    try {
        console.log('enter update phq9 result');
        const { result } = req.body;

        const update = {
            phq9Result: result
        }
        const updatedScore = await User.findByIdAndUpdate(req.user, update, { new: true, runValidators: true }).select('phq9Result');

        if (updatedScore) {
            return res.status(200).json({
                updatedScore
            })
        } else {
            return next(createError(400, 'cannot update the score'))
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errorName: error.name,
            message: error.message
        })
    }
}

/// GAD-7 standard assessment report 

exports.getGad7Result = async (req, res, next) => {
    try {
        console.log('hit get gad 7 result');

        const result = await User.findById(req.user).select('gad7Result');

        if (result) {
            return res.status(200).json({
                result
            })
        } else {
            return next(createError(400, 'cannot get the Gad result'))
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errorName: error.name,
            message: error.message
        })
    }
}

exports.updateGad7Result = async (req, res, next) => {
    try {
        console.log('enter update gad 7 result');
        const { result } = req.body;

        const update = {
            gad7Result: result
        }
        const updatedScore = await User.findByIdAndUpdate(req.user, update, { new: true, runValidators: true }).select('gad7Result');

        if (updatedScore) {
            return res.status(200).json({
                updatedScore
            })
        } else {
            return next(createError(400, 'cannot update gad7 score'))
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errorName: error.name,
            message: error.message
        })
    }
}

exports.diagnosisPhq9 = async (req, res, next) => {
    try {
        console.log('enter diagnosis PHQ-9');

        const { result } = req.body;

        if(result < 0 || result > 27) return next(createError(400,'Invalid score'))

        if (result >= 0 && result <= 4) {
            return res.status(200).json({
                depressionSeverity: 'non minimal',
                proposedTreatment: 'none'
            })
        }

        if (result >= 5 && result <= 9) {
            return res.status(200).json({
                depressionSeverity: 'mild',
                proposedTreatment: 'Watchful waiting; repeat PHQ-9 at follow-up'
            })
        }

        if (result >= 10 && result <= 14) {
            return res.status(200).json({
                depressionSeverity: 'moderate',
                proposedTreatment: 'Treatment plan, considering counseling, follow-up and/or pharmacotherapy'
            })
        }

        if (result >= 15 && result <= 19) {
            return res.status(200).json({
                depressionSeverity: 'moderately severe',
                proposedTreatment: 'Active treatment with pharmacotherapy and/or psychotherapy'
            })
        }

        if (result >= 20 && result <= 27) {
            return res.status(200).json({
                depressionSeverity: 'severe',
                proposedTreatment: 'Immediate initiation of pharmacotherapy and, if severe impairment or poor response to therapy, expedited referral to a mental health specialist for psychotherapy and/or collaborative management'
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


exports.diagnosisGad7 = async (req, res, next) => {
    try {
        console.log('enter diagnosis GAD-7');

        const { result } = req.body;

        if(result < 0 || result > 21) return next(createError(400,'Invalid score'))

        if (result >= 0 && result <= 4) {
            return res.status(200).json({
                anxietySeverity: 'minimal anxiety'
            })
        }

        if (result >= 5 && result <= 9) {
            return res.status(200).json({
                anxietySeverity: 'mild anxiety',
            })
        }

        if (result >= 10 && result <= 14) {
            return res.status(200).json({
                anxietySeverity: 'moderate anxiety',
            })
        }

        if (result >= 15 && result <= 21) {
            return res.status(200).json({
                anxietySeverity: 'severe anxiety',
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