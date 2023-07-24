require('dotenv').config();
const express   = require('express');
const router    = express.Router();
const util      = require('util');
const path      = require('path');
const nodemailer = require("nodemailer");
const bcrypt    = require('bcrypt');
const {v4 : uuid} = require('uuid');
const { Upload, Query } = require('../../../../server');


router.get('/dashboard/teacher/course/my-courses', async(req, res) => {
    //get data
    const asyncQuery = util.promisify(Query.query).bind(Query); // make query async/await
    const teacher = await asyncQuery(`
    SELECT * FROM courses WHERE courses.teacher = ${req.session.user.id}
    `);

    if(!teacher){
        return res.send('didn\'t recognise you')
    }
    res.render('./dashboards/teacher/courses/all-teacher-courses.ejs', {data : teacher})
})


module.exports = router;