require('dotenv').config();
const express   = require('express');
const router    = express.Router();
const bcrypt    = require('bcrypt');
const util = require("util");
const nodemailer = require("nodemailer");
const {v4 : uuid} = require("uuid");
const { userExists } = require('../functions');
const { Query } = require('../../../server');
const path = require('path');


router.get('/auth/register/teacher', (req, res) => {
    // res.render('./auth/teacher.register.ejs');
    res.sendFile(path.join(__dirname + '../../../../views/auth/teacher.register.html'))
});

router.post('/auth/register/teacher', async (req, res) => {
    console.log(req.body);
    if(!req.body.firstName || !req.body.lastName || !req.body.number 
    || !req.body.email || !req.body.password || 
    !req.body.gender || !req.body.Designation || 
    !req.body.department || !req.body.birth || !req.body.education){

        return res.json({err_message : "Please Complete The Form"});
    }

    //phone number onely numbers
    const numberRegx = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
    if(!numberRegx.test(req.body.number)){
        return res.json({err_message : "unvalid phone number. Please Type yours correctly"});
    }

    // check if phone number already exists in teachers DB
    const asyncQuery = util.promisify(Query.query).bind(Query); // make query async/await
    const phoneExists = await asyncQuery(`SELECT * FROM teachers WHERE phone_number= ?`,[req.body.number]);
    if(phoneExists.length >0){
        return res.json({err_message : "Phone Number Already taking"});
    }

    //validate email
    const emailRegx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(!emailRegx.test(req.body.email)){
        return res.json({err_message : "Email is unvalid. Please Write your Email correctly"})
    }

    //check if email already exists in teachers and users DB
    // const userExists = await asyncQuery(`
    // (SELECT * FROM teachers WHERE email = ?) 
    // UNION 
    // (SELECT * FROM users WHERE email = ?); `,[req.body.email, req.body.email]);
    const user = await userExists(req.body.email, 'email');
    if(user.length >0){
        return res.json({err_message : "Email already taking"});
    }

    //password not less then 6 figirs
    if(req.body.password < 6){
        return res.json({err_message : "Password must be at lest 6 characters"});
    }

    // hash password
    const hashedPass = await bcrypt.hash(req.body.password, 10);

    // gender should be one of the list [male, female]
    const gender = ['male','female'];
    if(!gender.includes(req.body.gender.toLowerCase())){
        return res.json({err_message : "Please choose a correct gender"});
    }
    // check if department is one of the list 
    //insert data
    Query.query(`
    INSERT INTO teachers 
    (user_id, first_name, last_name , 
    phone_number, email, password, 
    gender, designation, department,
    birth_day, education, joining_date)
    VALUES (?, ?, ?, ?, ?, ?,?,?,?,?,?,?);`,
    [uuid(), req.body.firstName, req.body.lastName,
         req.body.number, req.body.email,
         hashedPass,req.body.gender,
         req.body.Designation, req.body.department,
         req.body.birth, req.body.education, new Date()
    ], (err, result) => {
        if(err) throw err;
        console.log("teacher added successfully ✅");
    })


})
module.exports = router;