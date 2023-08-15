require('dotenv').config();
const express   = require('express');
const router    = express.Router();
const util      = require('util');
const path      = require('path');
const nodemailer = require("nodemailer");
const bcrypt    = require('bcrypt');
const {v4 : uuid} = require('uuid');
const { Upload, Query } = require('../../../../server');


/*
    Here we are configuring our SMTP Server details.
    STMP is mail server which is responsible for sending and recieving email.
    */
    const smtpTransport = nodemailer.createTransport({
        service: process.env.SMTP_service,
        auth: {
            user: process.env.SMTP_email,
            pass: process.env.SMTP_password,
        },
    });
    let mailOptions;
/*------------------SMTP Over-----------------------------*/

router.get('/dashboards/teacher/apps/email/compose', async(req, res) => {
    res.render('./dashboards/teacher/apps/email/compose.ejs')
})



router.post('/dashboards/teacher/apps/email/compose', Upload.array('file'), async(req, res) => {
    console.log(req.body, req.files);
    if(!req.body.to || !req.body.subject || !req.body.text){
        return res.json({err_message : "Please Complete The email"})
    }
    const {to, subject, text} = req.body;

    // send email
    mailOptions={
        from : process.env.SMTP_email,
        to : to,// get email from user_id specifieded in the url
        subject : subject,
        // name :" req.session.user.email",
        html : `
        <p>${text}</p>
        <br/>
        <a href="${req.headers.host}/uploads/${req.files[0].filename}">${req.files[0].filename}</a>
        `
    } 

    console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function(error, response){
    if(error){
        console.log(error);
        res.end("error");
    }
    else{
            console.log("Message sent: " + response);
            res.send("verification code sent ✅");
        }
    });

    res.json(req.body)
})


module.exports = router;