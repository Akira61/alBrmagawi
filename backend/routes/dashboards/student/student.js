require('dotenv').config();
const express   = require('express');
const router    = express.Router();
const util      = require('util');
const path      = require('path');
const nodemailer = require("nodemailer");
const {Query}     = require('../../../server');


router.get('/dashboard/student', (req, res) => {
    // res.render('./dashboards/student/student.ejs')
    res.sendFile(path.join(__dirname + '../../../../views/dashboards/student/student.html'))
})

// How student will view the Course
    router.use('/', require('./course/view'));
// End Of How student will view the Course

module.exports = router;