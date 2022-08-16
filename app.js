const path = require('path');
const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));

app.use('/public',express.static(path.join(__dirname,'public')));

const userAuthRoutes = require('./routes/user.auth.routes');
const supportRoutes = require('./routes/support.routes'); //these routes deals with all the introduction , privacy terms & cond, cotact us
const standardAssesmentsRoutes = require('./routes/standardAssesments/standardAssesments.routes');
const schoolTimeStory = require('./routes/schoolStories/schoolStories.routes');
const userLessonRoutes = require('./routes/lessons/lesson.routes');
const userRatingRoutes = require('./routes/rating/rating.routes');
const userDistortionRoutes = require('./routes/distortions/distortion.routes');
const userSituationRoutes = require('./routes/situations/situations.routes');
const userDiaryRoutes = require('./routes/diary/diary.routes');

/// Admin routes require
const adminAuthRoutes = require('./routes/admin/admin.auth.routes');
const adminUserRoutes = require('./routes/admin/admin.user.routes');
const adminFileUpload = require('./routes/admin/fileUpload/fileUpload.routes');
const adminSchoolTimeStoryRoutes = require('./routes/admin/admin.story.routes');
const adminLessonRoutes = require('./routes/admin/admin.lesson.routes');
const adminCognitiveDistortionRoutes = require('./routes/admin/admin.cognitiveDistortion.routes');
const adminSituationRoutes = require('./routes/admin/admin.situation.routes');
const adminThoughtDiariesRoutes = require('./routes/admin/admin.thoughtDiaries.routes');




app.use('/api',supportRoutes);
app.use('/api',userAuthRoutes);
app.use('/api',standardAssesmentsRoutes);
app.use('/api',schoolTimeStory);
app.use('/api',userLessonRoutes)
app.use('/api',userRatingRoutes);
app.use('/api',userDistortionRoutes);
app.use('/api',userDiaryRoutes);

///// admin routes use

app.use('/api',adminAuthRoutes);
app.use('/api',adminUserRoutes);
app.use('/api',adminFileUpload);
app.use('/api',adminSchoolTimeStoryRoutes);
app.use('/api',adminLessonRoutes);
app.use('/api',adminCognitiveDistortionRoutes);
app.use('/api',adminSituationRoutes);
app.use('/api',userSituationRoutes);
app.use('/api',adminThoughtDiariesRoutes);

app.get('/',async (req,res,next)=>{
    return res.status(200).json({
        message: "Welcome to api portal"
    })
})

app.use(function(error,req,res,next){
    if (error.status) {
        return res.status(error.status).json({
            errorName: error.name,
            message: error.message
        })
    } else {
        return res.status(500).json({
            errorName: error.name,
            message: error.message
        })
    }
})

module.exports = app;



