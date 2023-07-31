require('dotenv').config();
const express   = require('express');
const router    = express.Router();
const util      = require('util');
const path      = require('path');
const nodemailer = require("nodemailer");
const bcrypt    = require('bcrypt');
const {v4 : uuid} = require('uuid');
const { Upload, Query } = require('../../../../server');



router.get('/dashboard/teacher/course/upload-course', (req, res) => {
    res.render('./dashboards/teacher/courses/upload-course.ejs');
}) 

router.post('/dashboard/teacher/course/upload-course',Upload.array('upload-video'), (req, res) => {
    console.log(req.body)
    console.log(JSON.parse(req.body.data));
    // console.log(req.body);
    // console.log(req.body.data['lessons'])
    res.send(req.body);
    console.log(req.files);

    if(!req.body.data){
        return res.json({err_message : "No data sent"});
    }

    const data = JSON.parse(req.body.data);
    /**
     * bugs
     * req.body.Title maybe one, so its not an array witch will effect the loop 
     * if the lesson one's content url, and lesson2 is a video , it will store the video on the lesson 1 because we check if there are files on the content
     */

    // check if its multiple lessons
 
    for(let i=0; i < data.lessons.length; i++){
        Query.query(`
        INSERT INTO lessons
        (lesson_id, chapter, title, content, content_type, description, public,date)
        VALUES (?,?,?,?,?,?,?,?)
        `, [uuid(), data.lessons[i].chapter, data.lessons[i].Title,
        data.lessons[i].typeOfContent=='upload-video' ? 
        '/uploads/'+req.files[i].filename : data.lessons[i].content,
        data.lessons[i].typeOfContent,
        data.lessons[i].description? data.lessons[i].description : '',0, new Date()
        ], (err, result) => {
            if(err) throw err;
            console.log('lesson added ✅')
        })
    }
    
}) 
 
module.exports = router;




// if(Array.isArray(req.body.title)){
 
//     for(let i=0; i < req.body.Title.length; i++){
//         Query.query(`
//         INSERT INTO lessons
//         (lesson_id, chapter, title, content, content_type, description, public,date)
//         VALUES (?,?,?,?,?,?,?,?)
//         `, [uuid(), req.body.chapter, req.body.Title[i],
//         req.body.typeOfContent[i]=='upload-video' ? 
//         '/uploads/'+req.files[i].filename : req.body.contentType[i],
//         req.body.typeOfContent[i],
//         req.body.description? req.body.description[i] : '',0, new Date()
//     ], (err, result) => {
//         if(err) throw err;
//         console.log('lesson added ✅')
//     })
//     }
//     return; 
// }else {      
//     Query.query(`
//         INSERT INTO lessons
//         (lesson_id, chapter, title, content, content_type, description, public,date)
//         VALUES (?,?,?,?,?,?,?,?)
//         `, [uuid(), req.body.chapter, req.body.Title,
//         req.files?'/uploads/'+req.files[0].filename: req.body.contentType,
//         req.body.typeOfContent,
//         req.body.description? req.body.description : '',0, new Date()
//     ], (err, result) => { 
//         if(err) throw err;
//         console.log('lesson added ✅')
//     })
// } 