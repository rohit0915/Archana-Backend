const createError = require('http-errors');

const Admin = require('../../models/admin.model');


const StoryQuestion = require('../../models/schoolStories/question.model');
const SchoolStory = require('../../models/schoolStories/school.story.model');

exports.addStory = async (req, res, next) => {
    try {
        console.log('hit admin add school time story');

        const { title, description, questions, media,story } = req.body;

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
        return res.status(200).json({
            errorName: error.name,
            message: error.message
        })
    }
}