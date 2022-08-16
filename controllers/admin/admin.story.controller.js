const createError = require('http-errors');

const StoryQuestion = require('../../models/schoolStories/question.model');
const SchoolStory = require('../../models/schoolStories/school.story.model');

exports.addStory = async (req, res, next) => {
    try {
        console.log('hit admin add school time story');

        const { title, description, questions, media, story } = req.body;

        const newSchoolStory = new SchoolStory({
            title,
            description,
            media,
            story
        })

        const questionsArray = questions.map((item) => {
            return {
                schoolTimeStory: newSchoolStory._id,
                question: item.question,
                options: item.options

            }
        })
        const storyquestions = await StoryQuestion.create(questionsArray);

        const storyQuestionsIds = storyquestions.map((item) => item._id);

        newSchoolStory.questions = storyQuestionsIds;

        // console.log(newSchoolStory);

        const savedSchoolStory = await newSchoolStory.save();

        if (savedSchoolStory) {
            return res.status(200).json({
                message: " school story save success",
                savedSchoolStory
            })
        } else {
            return next(createError(400, 'cannot add the story'))
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errorName: error.name,
            message: error.message
        })
    }
}

exports.getAllSchoolTimeStories = async (req, res, next) => {
    try {
        console.log('hit admin get all school time stories');

        const stories = await SchoolStory.find({});

        if (!stories) return next(createError(400, 'cannot get the stories'));

        return res.status(200).json(stories);

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errorName: error.name,
            message: error.message
        })
    }
}


exports.getSchoolTimeStoryById = async (req, res, next) => {
    try {
        console.log('hit admin get school time story by id');

        const { schoolTimeStoryId } = req.params;

        const story = await SchoolStory.findById(schoolTimeStoryId).populate('questions');

        if (!story) return next(createError(400, 'cannot get the required story'));

        return res.status(200).json(story);

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errorName: error.name,
            message: error.message
        })
    }
}

exports.editSchoolTimeStoryById = async (req, res, next) => {
    try {
        console.log('hit admin edit school time story by id');
        const { schoolTimeStoryId } = req.params;

        const { title, description, media } = req.body;

        const update = {
            title,
            description,
            media
        }

        const updated = await SchoolStory.findByIdAndUpdate(schoolTimeStoryId, update, { new: true, runValidators: true });

        if(!updated) return next(createError(400,'cannot update the school time story'));

        return res.status(200).json(updated);


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errorName: error.name,
            message: error.message
        })
    }
}

exports.deleteSchoolTimeStoryById = async (req, res, next) => {
    try {
        console.log('hit admin delete school time story by id');
    
        const { schoolTimeStoryId } = req.params;

        const deleted = await SchoolStory.findByIdAndDelete(schoolTimeStoryId);

        if(!deleted) return next(createError(400,'cannot delete the school time story'));

        return res.status(200).json({message:'deletion successfull'});
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errorName: error.name,
            message: error.message
        })
    }
}