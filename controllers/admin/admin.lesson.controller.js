const createError = require('http-errors');
const Lesson = require('../../models/lesson/lesson.model');
const LessonQuestion = require('../../models/lesson/lesson.question.model');

exports.addLesson = async (req, res, next) => {
    try {
        console.log('hit add lesson by admin');
        const { title, description, storyExplaination, questions: questionsFromBody, summary, media } = req.body;

        const { storyQuestions: stqs, testUnderstandingQuestions: tuqs, practiceQuestions: pqs } = questionsFromBody;

        const lesson = new Lesson({
            title,
            description,
            storyExplaination,
            summary,
            media
            // questions
        })

        const storyQuestionsArray = stqs.map((item) => {
            return {
                lesson: lesson._id,
                question: item.question,
                options: item.options,
                answer: item.answer
            }
        })

        const testUnderstandingQuestionsArray = tuqs.map((item) => {
            return {
                lesson: lesson._id,
                question: item.question,
                options: item.options,
                answer: item.answer
            }
        })

        const practiceQuestionsArray = pqs.map((item) => {
            return {
                lesson: lesson._id,
                question: item.question,
                options: item.options,
                answer: item.answer
            }
        })



        const storyQuestionsDb = await LessonQuestion.create(storyQuestionsArray);
        const testUnderstandingQuestionsDb = await LessonQuestion.create(testUnderstandingQuestionsArray);
        const practiceQuestionsDb = await LessonQuestion.create(practiceQuestionsArray);


        if (!storyQuestionsDb || !testUnderstandingQuestionsDb || !practiceQuestionsDb) return next(createError(400, 'cannot save the questions to database'));

        const storyQuestionsIds = storyQuestionsDb.map((item) => item._id);
        const testUnderstandingQuestionsIds = testUnderstandingQuestionsDb.map((item) => item._id);
        const practiceQuestionsIds = practiceQuestionsDb.map((item) => item._id);


        // console.log(storyQuestionsIds);

        lesson.questions = {
            storyQuestions: storyQuestionsIds, testUnderstandingQuestions: testUnderstandingQuestionsIds,
            practiceQuestions: practiceQuestionsIds
        };

        const newLesson = await lesson.save()
        if (!newLesson) return next(createError(400, 'cannot save the lesson'));

        return res.status(200).json({
            newLesson
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errorName: error.name,
            message: error.message
        })
    }
}

exports.getAllLessons = async (req, res, next) => {
    try {
        console.log('hit admin get all lessons');

        const lessons = await Lesson.find({}).select('title description');

        if (!lessons) return next(createError(400, 'cannot get all lessons'));

        return res.status(200).json(lessons);

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errorName: error.name,
            message: error.message
        })
    }
}

exports.getLessonById = async (req, res, next) => {
    try {

        console.log('admin get lesson by id');
        const { lessonId } = req.params;


        const requiredLesson = await Lesson.findById(lessonId).populate('questions.storyQuestions').populate('questions.testUnderstandingQuestions').populate('questions.practiceQuestions')

        if (requiredLesson) {
            return res.status(200).json({
                requiredLesson
            })
        } else {
            return next(createError(404, 'lesson not found'))
        }


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errorName: error.name,
            message: error.message
        })
    }
}

exports.editLessonById = async (req, res, next) => {
    try {
        console.log('hit admin edit lesson by id');

        if (Object.keys(req.body).length === 0) return next(createError(400, 'empty body received'))

        const { lessonId } = req.params;

        const { title, description, media } = req.body;

        const update = {
            title,
            description,
            media
        }

        const updated = await Lesson.findByIdAndUpdate(lessonId, update, { new: true, runValidators: true });

        if (!updated) return next(createError(400, 'cannot update the lesson'));

        return res.status(200).json(updated);

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errorName: error.name,
            message: error.message
        })
    }
}

exports.deleteLessonById = async (req,res,next) => {
    try {
        console.log('hit admin delete the lesson by id ');
        
        const { lessonId } = req.params;

        const deleted = await Lesson.findByIdAndDelete(lessonId);

        if(!deleted) return next(createError(400,'cannot delete the lesson'));

        return res.status(200).json({message:'deletion successfull'});
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errorName: error.name,
            message: error.message
        })
    }
}