require('dotenv').config();
const express   = require('express');
const router    = express.Router();
const util      = require('util');
const path      = require('path');
const nodemailer = require("nodemailer");
const bcrypt    = require('bcrypt');
const fs        = require('fs');
const {v4 : uuid} = require('uuid');
const { Upload, Query } = require('../../../../server');

 

router.get('/dashboard/teacher/course/upload-course', (req, res) => {
    res.render('./dashboards/teacher/courses/upload-course.ejs');
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

    res.render('./dashboards/teacher/courses/upload.ejs', {id : course[0].id ,section});

})



router.post('/dashboard/teacher/course/upload-course',Upload.single('thumbnail'), (req, res) => {
    console.log(req.body)
    console.log(req.file)

    if( !req.body.content || !req.body.title || !req.body.course_id || !req.body.section){
        return res.json({err_message : "Please Complete the Form"});
    }
    
    // convert video to base64
    
    function encode_base64(file) {
        const bitmap = fs.readFileSync(file);
        return new Buffer(bitmap).toString('base64');
    }

    // check if its multiple lessons
    Query.query(`
    INSERT INTO lessons
    (lesson_id,course_id, section, title, content,thumbnail, content_type, description, public,date)
    VALUES (?,?,?,?,?,?,?,?,?,?)
    `, [uuid(),req.body.course_id,req.body.section , req.body.title,
    req.body.content, 
    req.file ? '/uploads/' + req.file.filename : null,
    "url",
    req.body.description? req.body.description : '',req.body.viewable == 'true'? 1 : 0, new Date()
    ], (err, result) => {
        if(err) throw err;
        console.log('lesson added ✅')
    }) 
    
    
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