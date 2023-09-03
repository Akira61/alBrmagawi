require('dotenv').config();
const express   = require('express');
const router    = express.Router();
const util      = require('util');
const path      = require('path');
const nodemailer = require("nodemailer");
const {Query}     = require('../../../../server');

// async DB query
const asyncQuery = util.promisify(Query.query).bind(Query); // make query async/await

router.get('/courses', (req, res) => {
    res.sendFile(path.join(__dirname + '../../../../../views/courses.html'))
})

//get all courses
router.get('/api/courses', async(req, res)=> {

    const courses = await asyncQuery(`
    SELECT 
    course_id, title,
    thumbnail,teacher, 
    price, description,
    date
    FROM courses WHERE public=1;
    `);
    // console.log(courses);
    res.json(courses);
})


// view spicefic course
router.get('/course/:id/:lesson', async(req, res) => {
    if(!req.params.id || !req.params.lesson){
        return res.json({err_message : 'invalid student url'});
    }

    const {id, lesson} = req.params;
    const lessons = await asyncQuery(`
    SELECT courses.course_id, lessons.* FROM lessons
    INNER JOIN courses ON courses.course_id = ? WHERE 
    lessons.lesson_id = ?;`
    ,[id, lesson]);
    console.log(lessons)
    // check if course exists
    if(lessons.length == 0) return res.json({err_message : "Course Not Found."});

    // get lesson's quiz
    const quiz = await asyncQuery(`
    SELECT * FROM quizzes 
    WHERE lesson_id = ?;`,[lessons[0].id]);
 
    console.log(quiz);
    // check if quiz exists
    //if(quiz.length == 0) return res.json({err_message : "quiz Not Found."});

    res.render('./dashboards/student/course/view.ejs', {lesson : lessons[0], quiz : quiz[quiz.length -1]?quiz[quiz.length -1].path:null})
})


module.exports = router;