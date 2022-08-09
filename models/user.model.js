const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const geo = require('./geoJson/geo.schema');
const schoolStoryProgressSchema = require('./progressSchemas/schoolTimeStory.schema');
const lessonProgressSchema = require('./progressSchemas/lesson.progress.schema');
const cognitiveDistortionProgressSchema = require('./progressSchemas/cognitiveDistortion.progress.schema');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        lowercase:true,
        default: ''
    },
    mobile: {
        type: String,
        default: ''
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    age: {
        type: String,
        lowercase: true
        // below 20, 20-25, 25-30, 30-35, 35+
    },
    gender:{
        type: String,
        lowercase: true
        // male, female , other
    },
    moodToday: {
        type: String,
        lowercase:true
    },
    agreeTermsPolicy:{
        type: Boolean,
        default: true
    },
    role:{
        type: String,
        default: 'user'
    },
    currentLocation:{
        type: geo
    },
    phq9Result:{
        // standard test for checking depression level  
        // this test have 9 Questions and min points for each question is 0 and max points is 3
        // more details :  https://www.hiv.uw.edu/page/mental-health-screening/gad-7
        type: Number,
        max: 27,
        default: 0
    },
    gad7Result:{
        // standard test for checking anxiety level
        // this test have 7 Questions and min points for each question is 0 and max points is 3
        type: Number,
        max: 21,
        default: 0
    },
    schoolStoryProgress:[schoolStoryProgressSchema],   //// type is array of schoolStoryProgressSchema

    lessonProgress: [lessonProgressSchema],

    congnitiveDistortionProgress:[cognitiveDistortionProgressSchema],

    numLessonCompleted: {
        type: Number,
        default: 0
    },

    allLessonCompleted: {
        type: Boolean,
        default: false
    }

})

userSchema.methods.genPassword = async function(passwordText){
    return bcrypt.hash(passwordText,10)
}

userSchema.methods.checkPassword = async function(passwordText,hashedPassword){
    return bcrypt.compare(passwordText,hashedPassword);
}

module.exports = mongoose.model('User',userSchema);
