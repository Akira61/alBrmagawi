require('dotenv').config();
const express   = require('express');
const router    = express.Router();
const util      = require('util');
const path      = require('path');
const nodemailer = require("nodemailer");
const bcrypt    = require('bcrypt');
const {v4 : uuid} = require('uuid');
const { Upload, Query } = require('../../../../server');


router.get('/dashboard/teacher/course/:id/sections', async(req, res) => {
    if(!req.params.id) return res.json({err_message : "specify course id"});

    const { id } = req.params;
    const asyncQuery = util.promisify(Query.query).bind(Query); // make query async/await
    const course = await asyncQuery(`SELECT * FROM courses WHERE course_id = ?;`,[id]);
    // check if course exists
    if(!course) return res.json({err_message : "Course Not Found."});
    console.log(course)
    const sections = course[0].sections.split(',');
    console.log(sections);

    res.render('./dashboards/teacher/courses/sections.ejs', {id, sections, course: course[0]});
})  


// post new section
router.post('/dashboard/teacher/course/:id/new-section', async(req, res) => {
    console.log(req.body);

    if(!req.params.id) return res.json({err_message : "unvalid course id"});
    const { id } = req.params;

    // check if section sent
    if(!req.body.section) return res.json({err_message : "no section sent"});
    const { section } = req.body;
    
    // add section
    Query.query(` 
    UPDATE courses SET sections = CONCAT(sections,?) WHERE course_id = ?
    `, [ ',' + section, id], (err, result) => {

        if(err) throw err;
        res.json({success : true});
    });
 
})




// upload lesson
router.get('/dashboard/teacher/course/:id/:section/upload-lesson', async(req, res) => {
    if(!req.params.id || !req.params.section) return res.json({err_message : "specify course id and section"});

    const { id } = req.params;
    const { section } = req.params;

    const asyncQuery = util.promisify(Query.query).bind(Query); // make query async/await
    const course = await asyncQuery(`SELECT * FROM courses WHERE course_id = ?;`,[id]);

    // check if course exists 
    if(course.length == 0) return res.json({err_message : "Course Not Found."});

    // check if section sent is exsists
    const sections = course[0].sections.split(',');
    console.log(sections);
    if(!sections.includes(section)) return res.json({err_message : "section not found"});
    res.send('success request ✅')
})
 
module.exports = router;

