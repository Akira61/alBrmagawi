require('dotenv').config();
const express   = require('express');
const router    = express.Router();
const util      = require('util');
const path      = require('path');
const nodemailer = require("nodemailer");
const bcrypt    = require('bcrypt');
const {v4 : uuid} = require('uuid');
const { Upload, Query } = require('../../../../server');


router.get('/dashboard/teacher/course/:id/:section/:quizType/create-quiz', async(req, res) => {
    if(!req.params.id || !req.params.section || !req.params.quizType){
        return res.json({err_message : "invalid url"});
    }
    const {id, section, quizType} = req.params;

    const asyncQuery = util.promisify(Query.query).bind(Query); // make query async/await
    const course = await asyncQuery(`SELECT * FROM courses WHERE course_id = ? AND sections LIKE ?;`,[id, '%' + section + '%']);
    // check if course and section exists 
    if(course.length == 0) return res.json({err_message : "Course Not Found."});
    
    // get the lessons of this section
    let lessons = await asyncQuery(`SELECT id, title FROM lessons WHERE course_id = ? AND section =?`,[course[0].id, section]);

    // check if the quiz for this section and not for specific lesson
    if(quizType == 'ForThisSection'){
        lessons = null;
    }
    console.log(lessons)

    res.render('./dashboards/teacher/quizes/make-quiz.ejs', {id,section,quizType, lessons})
})


router.post('/dashboard/teacher/course/:id/:section/create-quiz', async (req, res)=> {
    console.log(req.body)
    if(!req.params.id || !req.params.section){
        return res.json({err_message : "invalid url"});
    }

    const {id, section} = req.params;
    const asyncQuery = util.promisify(Query.query).bind(Query); // make query async/await
    const course = await asyncQuery(`SELECT * FROM courses WHERE course_id = ? AND sections LIKE ?;`,[id, '%' + section + '%']);
    // check if course and section exists 
    if(course.length == 0) return res.json({err_message : "Course Not Found."});


    // store data 
    const answers = req.body.answers.join(',');
    console.log(answers)

    asyncQuery(`
    INSERT INTO quizzes
    (quiz_id, lesson_id, course_id, section, question, answers, correct_answer, section_quiz, path)
    VALUES (?,?,?,?,?,?,?,?,?)
    `, 
    [uuid(), 
    req.body.lesson == 'ForThisSection'?null : req.body.lesson,
    course[0].id, section , req.body.question,
    answers,req.body.correctAnswer, 
    req.body.lesson == 'ForThisSection'?1 : 0,
    `/dashboard/teacher/course/${id}/${section}/${req.body.lesson}/quize`
    ])

} )

module.exports = router;