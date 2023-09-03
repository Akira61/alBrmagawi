require('dotenv').config();
const express   = require('express');
const router    = express.Router();
const util      = require('util');
const path      = require('path');
const nodemailer = require("nodemailer");
const bcrypt    = require('bcrypt');
const {v4 : uuid} = require('uuid');
const { Upload, Query } = require('../../../../server');


// load page
router.get('/dashboard/teacher/course/:courseID/:lessonID/edit-lesson', async(req, res) => {
    if(!req.params.courseID || !req.params.lessonID){
        return res.json({err_message : 'invalid url'});
    }
    // res.render('./dashboards/teacher/courses/edit-course.ejs',{
    //     lesson : lessons[0], 
    //     quiz : quiz.length==0?null:quiz[quiz.length -1].path,
    //     courseID
    // })
    res.sendFile(path.join(__dirname + '../../../../../views/dashboards/teacher/courses/edit-course.html'))
})



router.get('/dashboard/teacher/course/:courseID/:lessonID/edit-lesson-info', async(req, res) => {
    if(!req.params.courseID || !req.params.lessonID){
        return res.json({err_message : 'invalid url'});
    }
    
    const {courseID, lessonID} = req.params;
    const asyncQuery = util.promisify(Query.query).bind(Query); // make query async/await
    const lessons = await asyncQuery(`
    SELECT courses.course_id,course_sections.section,
    lessons.id,lessons.lesson_id, lessons.title,lessons.content, lessons.thumbnail, lessons.description
    FROM lessons
    INNER JOIN courses ON courses.course_id = ? 
    INNER JOIN course_sections ON course_sections.id = lessons.section 
    WHERE lessons.lesson_id = ?;`
    ,[courseID, lessonID]);
    console.log(lessons)
    // check if course exists
    if(lessons.length == 0) return res.json({err_message : "Course Not Found."});

    // get lesson's quiz
    const quiz = await asyncQuery(`
    SELECT * FROM quizzes 
    WHERE lesson_id = ?;`,[lessons[0].id]);
    console.log(quiz)
    // console.log(quiz);
    // check if quiz exists
   // if(quiz.length == 0) return res.json({err_message : "quiz Not Found."});

    // res.render('./dashboards/teacher/courses/edit-course.ejs',{
    //     lesson : lessons[0], 
    //     quiz : quiz.length==0?null:quiz[quiz.length -1].path,
    //     courseID
    // })
    res.json({
        lesson : lessons[0], 
        quiz : quiz.length==0?null:quiz[quiz.length -1].path,
        courseID
    })
})



router.put('/dashboard/teacher/course/:courseID/:lessonID/edit-lesson', async(req,res) => {
    console.log(req.body)
    if(!req.params.courseID || !req.params.lessonID){
        return res.json({err_message : 'invalid url'});
    }

    if(!req.body.title || !req.body.description || !req.body.content){
        return res.json({err_message : 'no data sent'});
    }
    
    const {title,description,content} = req.body;
    const {courseID, lessonID} = req.params;
    const asyncQuery = util.promisify(Query.query).bind(Query); // make query async/await
    const lessons = await asyncQuery(`
    SELECT courses.course_id, lessons.* FROM lessons
    INNER JOIN courses ON courses.course_id = ? WHERE 
    lessons.lesson_id = ?;`
    ,[courseID, lessonID]);
    // check if course exists
    if(lessons.length == 0) return res.json({err_message : "Course Not Found."});

    // update data
    asyncQuery(`
    UPDATE lessons SET title=?, description=?, content=?
    WHERE lesson_id =?;
    `, [title,description,content,lessonID])

    res.json({success : `/dashboard/teacher/course/${courseID}/sections`})
})


// remove lesson
router.get("/dashboard/teacher/course/:courseID/:lessonID/delete-lesson", async (req,res)=> {
    if(!req.params.courseID || !req.params.lessonID){
        return res.json({err_message : 'invalid url'});
    }

    const {courseID, lessonID} = req.params;
    const asyncQuery = util.promisify(Query.query).bind(Query); // make query async/await
    const lessons = await asyncQuery(`
    SELECT courses.course_id, lessons.* FROM lessons
    INNER JOIN courses ON courses.course_id = ? WHERE 
    lessons.lesson_id = ?;`
    ,[courseID, lessonID]);
    // check if course exists
    if(lessons.length == 0) return res.json({err_message : "Course Not Found."});

    asyncQuery(`
    DELETE FROM lessons WHERE lesson_id=?;
    `, [lessonID]);
    res.redirect(`/dashboard/teacher/course/${courseID}/sections`);
})
module.exports = router;