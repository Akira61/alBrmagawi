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
    // res.render('./dashboards/teacher/courses/sections.ejs', {id, sections, course: course[0], lessons, quizzes});
    res.sendFile(path.join(__dirname + '../../../../../views/dashboards/teacher/courses/sections.html'))
})



router.get('/dashboard/teacher/course/:id/sections-info', async(req, res) => {
    if(!req.params.id) return res.json({err_message : "specify course id"});

    const { id } = req.params;
    const asyncQuery = util.promisify(Query.query).bind(Query); // make query async/await
    const course = await asyncQuery(`SELECT * FROM courses WHERE course_id = ?;`,[id]);
    // check if course exists
    if(course.length == 0) return res.json({err_message : "Course Not Found."});
    // course sections
    //const sections = course[0].sections.split(',');
    const sections = await asyncQuery(`
    SELECT section FROM course_sections WHERE course_id=?;
    `, [course[0].id])
    console.log(sections.section);
    
    // get course lessons
    const lessons = await asyncQuery(`
    SELECT lessons.title, course_sections.section, 
    lessons.lesson_id FROM lessons 
    INNER JOIN course_sections ON lessons.section =course_sections.id WHERE lessons.course_id = ?;`,[course[0].id]
    );
    console.log(lessons)
    
    //get section quizzes
    const quizzes = await asyncQuery(`
    SELECT * FROM quizzes WHERE course_id = ?;`,[course[0].id]
    );

    // res.render('./dashboards/teacher/courses/sections.ejs', {id, sections, course: course[0], lessons, quizzes});
    res.json({id, sections, course: course[0], lessons, quizzes})
})  




// post new section
router.post('/dashboard/teacher/course/:id/new-section', async(req, res) => {
    console.log(req.body);

    if(!req.params.id) return res.json({err_message : "unvalid course id"});
    
    // check if section sent
    if(!req.body.section) return res.json({err_message : "no section sent"});
    const { id } = req.params;
    const { section } = req.body;
    
    // check if course exists
    const asyncQuery = util.promisify(Query.query).bind(Query); // make query async/await
    const course = await asyncQuery(`SELECT * FROM courses WHERE course_id = ?;`,[id]);
    if(course.length == 0) return res.json({err_message : "Course Not Found."});

    // insert new section in course_sections DB
    asyncQuery(`
    INSERT INTO course_sections
    (section_id, course_id, section)
    VALUES (?, ?, ?);
    `, [uuid(),course[0].id,section]);
    
})


//update section
router.put('/dashboard/teacher/course/:id/sections/update-section/', async(req, res) => {
    if(!req.params.id || !req.body.newSection || !req.body.section) return res.json({err_message : "invalid url"});
    console.log(req.body);
    const {id} = req.params;
    const {section, newSection} = req.body;
    const asyncQuery = util.promisify(Query.query).bind(Query); // make query async/await
    const course_sections = await asyncQuery(`
    SELECT courses.course_id,course_sections.* FROM course_sections
    INNER JOIN courses ON courses.course_id = ?
    WHERE course_sections.section =?;`,[id,section ]);

    // check if course exists
    if(course_sections.length == 0) return res.json({err_message : "Course Not Found."});

    // const updateSection = await asyncQuery(`
    // UPDATE courses SET sections = REPLACE(sections,?, ?) WHERE course_id = ?;
    // `,[section,newSection,id]);
    // console.log(updateSection);
    await asyncQuery(`
    UPDATE course_sections SET section = ? WHERE course_id =? AND id = ?;
    `,[newSection, course_sections[0].course_id, course_sections[0].id])
    
})


//delete section
router.get('/dashboard/teacher/course/:id/sections/:section/delete-section/', async(req,res)=> {
    if(!req.params.id || !req.params.section) return res.json({err_message : "invalid url"});
    console.log(req.body);
    const {id,section} = req.params;
    const asyncQuery = util.promisify(Query.query).bind(Query); // make query async/await
    const course_sections = await asyncQuery(`
    SELECT courses.course_id,course_sections.* FROM course_sections
    INNER JOIN courses ON courses.course_id = ?
    WHERE course_sections.section =?;`,[id,section]);
    // check if course and section exists
    if(course_sections.length == 0) return res.json({err_message : "Course Not Found."});

    // delete section
    await asyncQuery(`
    DELETE FROM course_sections WHERE id=?;
    `,[course_sections[0].id]);

    //res.redirect('back');
    res.redirect(`/dashboard/teacher/course/${id}/sections`);

})
module.exports = router;

