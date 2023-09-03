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
router.get('/dashboard/teacher/course/:id/:section/:quizType/create-quiz', async(req, res) => {
    if(!req.params.id || !req.params.section || !req.params.quizType){
        return res.json({err_message : "invalid url"});
    }
    const {id, section, quizType} = req.params;

    const asyncQuery = util.promisify(Query.query).bind(Query); // make query async/await
    const course = await asyncQuery(`SELECT * FROM courses WHERE course_id = ?;`,[id]);
    // check if course and section exists 
    if(course.length == 0) return res.json({err_message : "Course Not Found."});

    // res.render('./dashboards/teacher/quizes/make-quiz.ejs', {id,section,quizType, lessons})
    res.sendFile(path.join(__dirname + '../../../../../views/dashboards/teacher/quizes/make-quiz.html'))
})



router.get('/dashboard/teacher/course/:id/:section/:quizType/create-quiz-info', async(req, res) => {
    if(!req.params.id || !req.params.section || !req.params.quizType){
        return res.json({err_message : "invalid url"});
    }
    const {id, section, quizType} = req.params;

    const asyncQuery = util.promisify(Query.query).bind(Query); // make query async/await
    const course = await asyncQuery(`SELECT * FROM courses WHERE course_id = ?;`,[id]);
    // check if course and section exists 
    if(course.length == 0) return res.json({err_message : "Course Not Found."});
    
    //get section
    const course_section = await asyncQuery(`
    SELECT id FROM course_sections WHERE course_id=? AND section = ?;
    `,[course[0].id, section]) 
    // get the lessons of this section
    let lessons = await asyncQuery(`SELECT id,lesson_id, title FROM lessons WHERE course_id = ? AND section =?`,[course[0].id, course_section[0].id]);

    // check if the quiz for this section and not for specific lesson
    if(quizType == 'ForThisSection'){
        lessons = null;
    }
    console.log(lessons)

    // res.render('./dashboards/teacher/quizes/make-quiz.ejs', {id,section,quizType, lessons})
    res.json({id,section,quizType, lessons})
})


router.post('/dashboard/teacher/course/:id/:section/create-quiz', async (req, res)=> {
    console.log(req.body)
    if(!req.params.id || !req.params.section){
        return res.json({err_message : "invalid url"});
    }

    const {id, section} = req.params;
    const asyncQuery = util.promisify(Query.query).bind(Query); // make query async/await
    // const course = await asyncQuery(`SELECT * FROM courses WHERE course_id = ? AND sections LIKE ?;`,[id, '%' + section + '%']);
    const course = await asyncQuery(`
    SELECT courses.course_id,course_sections.* FROM course_sections
    INNER JOIN courses ON courses.course_id = ?
    WHERE course_sections.section =?;`,[id,section ]);
    console.log(course)
    // check if course exists 
    if(course.length == 0) return res.json({err_message : "Course Not Found."});
    
    //get sections
    const course_section = await asyncQuery(`
    SELECT id FROM course_sections WHERE course_id=? AND section =?;
    `,[course[0].course_id, section]);
    console.log(course_section);

    // store data 
    const answers = req.body.answers.join(',');
    console.log(answers)

    Query.query(`
    INSERT INTO quizzes
    (quiz_id, lesson_id, course_id, section, question, answers, correct_answer, section_quiz, path)
    VALUES (?,?,?,?,?,?,?,?,?)
    `, 
    [uuid(), 
    req.body.lesson == 'ForThisSection'?null : req.body.lesson,
    course[0].course_id, course_section[0].id , req.body.question,
    answers,req.body.correctAnswer, 
    req.body.lesson == 'ForThisSection'?1 : 0,
    `/dashboard/teacher/course/${id}/${section}/${req.body.lesson}/quize`
    ], (err, result) => {
        if(err) throw err;
        console.log("Quiz added ✅")
        res.json({success : true});
    })

} )

module.exports = router;