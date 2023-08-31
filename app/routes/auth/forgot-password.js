require('dotenv').config();
const express   = require('express');
const router    = express.Router();
const util      = require('util');
const bcrypt    = require('bcrypt');
const path      = require('path');
const nodemailer = require("nodemailer");
const {Query}     = require('../../server');
const { userExists } = require('./functions');


/*
    Here we are configuring our SMTP Server details.
    STMP is mail server which is responsible for sending and recieving email.
    */
    const smtpTransport = nodemailer.createTransport({
        service: process.env.SMTP_service,
        auth: {
            user: process.env.SMTP_email,
            pass: process.env.SMTP_password
        }
    });
    let rand, mailOptions, host, link;
/*------------------SMTP Over-----------------------------*/


// page where user enter the email
router.get('/auth/forgot-password', (req, res) => {
    if (req.session.auth){
        return res.redirect('/');
    }
    // res.render('./auth/forgot-password.ejs')
    res.sendFile(path.join(__dirname + '../../../views/auth/forgot-password.html'))
})

router.post('/auth/forgot-password', async(req, res) => {
    if(!req.body.email) return res.send('no email sent');

    const {email} = req.body;

    //check if email exists
    const asyncQuery = util.promisify(Query.query).bind(Query); // make query async/await
    // const user = await asyncQuery(`
    // (SELECT * FROM teachers WHERE email = ?) 
    // UNION 
    // (SELECT * FROM users WHERE email = ?); `,[email,email]);
    const user = await userExists(email, 'email')
    console.log(user)
    if(user.length == 0)return res.send('email not found. Please try to <a href="/auth/register">sign up</a>');

    // generate random token
    rand = Math.floor(100000 + Math.random() * 900000);
    host =req.get('host');
    link ="http://"+req.get('host')+"/auth/forgot-password/reset-pass?id="+rand;

    //send email link to reset password
    mailOptions={
        from : process.env.SMTP_email,
        to : email,// get email from user_id specifieded in the url
        subject : "Reset password",
        html : "Hello,<br> Please Click on the link to reset your password.<br><a href="+link+">Click here to reset</a>" 
    }
    console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function(error, response){
    if(error){
            console.log(error);
            res.end("couldn't send the link through email. please try later");
    }else{
            console.log("Message sent: " + response);
            res.send("Reset password link sent ✅");
        }
    });

});

// page where user can write the new password
router.get('/auth/forgot-password/reset-pass', (req, res) => {

    if((req.protocol+"://"+req.get('host'))==("http://"+host)){

        console.log("Domain is matched. Information is from Authentic email");
        if(req.query.id ==rand){
            // return res.render('./auth/reset-password.ejs');
            return res.sendFile(path.join(__dirname + '../../../views/auth/reset-password.html'))

        }
        console.log("password couldn't be reset");
        // res.end("<h1>password couldn't be reset please try to <a href='/auth/fotgot-password'>reset password</a> again</h1>");
        // res.render('./error/error-400.ejs');
        res.sendFile(path.join(__dirname + '../../../views/error/error-400.html'))
        
    }else{
        res.end("<h1>Request is from unknown source</h1>");
    }
    
})


// get new password data
router.post('/auth/forgot-password/reset-password', async(req, res) => {
    // check if user complete the form
    if(!req.body.password || !req.body.password2){
        return res.json({err_message : 'Please complete the form'})
    }
    //check if passwords match
    if(req.body.password !== req.body.password2){
        return res.json({err_message : 'Passwords don\'t match'})
    }

    //hash new password
    const newPass = await bcrypt.hash(req.body.password, 10);

    //update password
    const asyncQuery = util.promisify(Query.query).bind(Query); // make query async/await
    const user = await asyncQuery(`
    UPDATE teachers SET password =? WHERE email=?;
    UPDATE users SET password =? WHERE email=?;
    `,[newPass, mailOptions.to,newPass, mailOptions.to]);

    // change rand so user can't go back to the link in the email and change the password
    rand = Math.floor(100000 + Math.random() * 900000);
    //redirct to login
    res.redirect('/auth/login');
})

module.exports = router;