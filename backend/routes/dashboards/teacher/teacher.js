require('dotenv').config();
const express   = require('express');
const router    = express.Router();
const util      = require('util');
const path      = require('path');
const nodemailer = require("nodemailer");

// check if the teacher who sent the request

//routes
router.get('/dashboard/teacher', (req, res) => {
    res.render('./dashboards/teacher/teacher.ejs');
})
  
// Courses
    router.use('/', require('./courses/all-teacher-courses')); // all teacher's courses
    router.use('/', require('./courses/new-course')); // new course info
    router.use('/', require('./courses/sections')); // course sections
    router.use('/', require('./courses/upload-courses')); // upload the courses
// End courses

//Quizes
router.use('/', require('./quizes/showQuize')); // show quize
router.use('/', require('./quizes/make-quiz')); // show quize
// End quizes






function auth(req, res, next){
    if(req.session.user.role == 'teacher' || req.session.user.role == 'admin'){
        return next()
    }
    res.redirect('/');
}
module.exports = router; 