require('dotenv').config();
const express   = require('express');
const router    = express.Router();
const util      = require('util');
const path      = require('path');
const nodemailer = require("nodemailer");
const bcrypt    = require('bcrypt');
const {v4 : uuid} = require('uuid');
const { Upload, Query } = require('../../../../server');

// data resived
let thumbnail, title, price, type, about

router.get('/dashboard/teacher/course/new-course', (req, res) => {
    res.render('./dashboards/teacher/courses/add-course.ejs');
})



router.post('/dashboard/teacher/course/new-course',Upload.single('thumbnail'), (req, res) => {
    console.log(req.body, req.file)
    console.log(req.session);
    //check size of image 
    if(req.file.size > 1048576){ // 10MB
        return res.json({err_message : "file too large"})
    }

    // check if file sent is image
    if(req.file){
        const fileExtension = req.file.originalname.split('.');
        const extension = fileExtension[fileExtension.length -1]; // get latest value
        const allowedFiles = ['png', 'jpg','jpeg','jfif','pjpeg'];
        if(!allowedFiles.includes(extension)){
            return res.json({err_message : `only these type of files allowed. ${allowedFiles}`})
        }

    }    
    // check if price is number
    const numRegex = /^[0-9]+$/;
    if(req.body.price){
        if(!numRegex.test(req.body.price)) return res.json({err_message : "Price must be a number"})
    }
    

    // insert to DB
    Query.query(`
    INSERT INTO courses 
    (course_id, teacher, thumbnail,title,description,price,date)
    VALUES (?,?,?,?,?,?,?)
    `,
    [uuid(), req.session.user.id,
    '/uploads/' + req.file.filename, req.body.title, 
     req.body.about, req.body.price, 
    new Date()], (err, result) => {
        
        if(err) throw err;
        console.log(`course added successfully ✅`)
    });
    
    res.send(req.body);
})


module.exports = router;