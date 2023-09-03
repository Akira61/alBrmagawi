require('dotenv').config();
const express   = require('express');
const router    = express.Router();
const util      = require('util');
const path      = require('path');
const nodemailer = require("nodemailer");
const bcrypt    = require('bcrypt');
const {v4 : uuid} = require('uuid');
const { Upload, Query } = require('../../../../server');

//load page
router.get('/dashboard/teacher/course/my-courses', async(req, res) => {
    if(!req.session.auth){
        return res.send("Please login");
    }
    // res.render('./dashboards/teacher/courses/all-teacher-courses.ejs', {data : teacher})
    res.sendFile(path.join(__dirname + '../../../../../views/dashboards/teacher/courses/all-teacher-courses.html'))
})



router.get('/dashboard/teacher/course/my-courses-info', async(req, res) => {
    if(!req.session.auth){
        return res.send("Please login");
    }
    //get data
    const asyncQuery = util.promisify(Query.query).bind(Query); // make query async/await
    const teacher = await asyncQuery(`
    SELECT * FROM courses WHERE courses.teacher = ${req.session.user.id}
    `);

    if(!teacher){
        return res.send('didn\'t recognise you')
    }
    // res.render('./dashboards/teacher/courses/all-teacher-courses.ejs', {data : teacher})
    res.json({data : teacher});
})


module.exports = router;