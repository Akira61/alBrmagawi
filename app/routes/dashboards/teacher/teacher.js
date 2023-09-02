require('dotenv').config();
const express   = require('express');
const router    = express.Router();
const util      = require('util');
const path      = require('path');
const nodemailer = require("nodemailer");

// check if the teacher who sent the request

//routes
router.get('/dashboard/teacher', (req, res) => {
    // res.render('./dashboards/teacher/teacher.ejs');
    res.sendFile(path.join(__dirname + '../../../../views/dashboards/teacher/teacher.html'))
})
  
// Courses
    router.use('/', require('./courses/all-courses')); // all teacher's courses
    router.use('/', require('./courses/sections')); // course sections
    router.use('/', require('./courses/upload-courses')); // upload the courses
    router.use('/', require('./courses/edit-course')); // edit course
// End courses

//Quizes
router.use('/', require('./quizes/showQuize')); // show quize
router.use('/', require('./quizes/make-quiz')); // show quize
// End quizes

// apps
    router.use('/', require('./apps/email-compose'))// teacher sends emails
// End apps





function auth(req, res, next){
    if(req.session.user.role == 'teacher' || req.session.user.role == 'admin'){
        return next()
    }
    res.redirect('/');
}
module.exports = router; 