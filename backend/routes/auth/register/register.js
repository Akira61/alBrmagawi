require('dotenv').config();
const express   = require('express');
const router    = express.Router();
const path      = require('path');
const bcrypt    = require('bcrypt');
const util = require("util");
const nodemailer = require("nodemailer");
const {v4 : uuid} = require("uuid");
const {Query}     = require('../../../server');


// get register page
router.get('/auth/register', (req, res) => {
    //check if user already loggedin 
    res.render('./auth/register.ejs');
})


//post data
router.post('/auth/register', async(req, res) => {
    console.log(req.body);
    // check if user already loggedin

    // check if user sent data
    if(!req.body.firstName || !req.body.lastName|| !req.body.email || !req.body.password){
        return res.json({err_message : "Please Complete The Fields"});
    }

    const {firstName, lastName, email, password} = req.body;


    // check if user already exists
    const asyncQuery = util.promisify(Query.query).bind(Query); // make query async/await
    const userExists = await asyncQuery(`SELECT * FROM users WHERE email='${email}'`);
    if(userExists.length > 0){
        return res.json({err_message: 'Email already takeing'})
    }

    // check if email is valid
    const emailRegx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(!emailRegx.test(email)){
        return res.json({err_message : "Email is unvalid. Please Write your Email correctly"})
    }
    
    //check if password is valid
    if(password.length < 5){
        return res.json({err_message : "Password Must Be 6 Characters Or Longer"})
    }
    //Hash user's password
    const hashedPass = await bcrypt.hash(password, 10);
    
    // insert the user with unverified
    const userId = uuid();
    const query = `
    INSERT INTO users(user_id, first_name, last_name, email, password)
    VALUES('${userId}', '${firstName}', '${lastName}','${email}', '${hashedPass}');`
    Query.query(query,(err, result) => {
        if(err) throw err;
        console.log("user added successfully ✅")

    })

    // send verification code
    res.redirect(process.env.HOST + `/auth/verify-code?to=${userId}`)
})


module.exports = router;