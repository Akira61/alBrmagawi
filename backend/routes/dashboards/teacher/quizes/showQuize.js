require('dotenv').config();
const express   = require('express');
const router    = express.Router();
const util      = require('util');
const path      = require('path');
const nodemailer = require("nodemailer");
const bcrypt    = require('bcrypt');
const {v4 : uuid} = require('uuid');
const { Upload, Query } = require('../../../../server');


router.get('/dashboard/teacher/course/:id/:section/:lesson/quize', async(req, res) => {
    
    if(!req.params.id || !req.params.section || !req.params.lesson){
        return res.json({err_message : "invalid url"});
    }
    const {id, section, lesson} = req.params;

    const asyncQuery = util.promisify(Query.query).bind(Query); // make query async/await
    const lessonQuery = await asyncQuery(`
    SELECT courses.course_id, lessons.* FROM lessons
    INNER JOIN courses ON courses.course_id = ? WHERE lessons.id=?;`,[id, lesson]);
    console.log(lessonQuery)
    // check if course and lesson exists 
    if(lessonQuery.length == 0 && lesson !== 'ForThisSection') return res.send(null);

    //get quizzes
    const quizzes = await asyncQuery(`SELECT * FROM quizzes WHERE lesson_id = ?;`,[lessonQuery.length !==0?lessonQuery[0].id:null]);
    console.log(quizzes);
    res.render('./dashboards/teacher/quizes/quize2.ejs', {quizzes : JSON.stringify(quizzes)})
})


module.exports = router;