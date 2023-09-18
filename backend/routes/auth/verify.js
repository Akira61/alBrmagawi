require('dotenv').config();
const express   = require('express');
const router    = express.Router();
const util      = require('util');
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
    let rand,mailOptions,host,link;
/*------------------SMTP Over-----------------------------*/
 
router.get('/auth/verify-code', async function(req,res){
    if(!req.query.to) return res.send('no email sent');
 
    // check if user exists
    const asyncQuery = util.promisify(Query.query).bind(Query); // make query async/await
    // const user = await asyncQuery(`
    // (SELECT * FROM teachers WHERE email = ?) 
    // UNION 
    // (SELECT * FROM users WHERE email = ?); 
    // `, [req.query.to, req.query.to]);
    // console.log(user);
    const user = await userExists(req.query.to, 'user_id');
    console.log("%".repeat(29), user)
    if(user.length == 0 || user[0].verified ==1){
        return res.json({err_message: 'user not found'})
    }
  
    // generate random token
    rand = Math.floor(100000 + Math.random() * 900000);
    host =req.get('host');
    link ="http://"+req.get('host')+"/auth/verify?id="+rand;
    mailOptions={
        from : process.env.SMTP_email,
        to : await user[0].email,// get email from user_id specifieded in the url
        subject : "Please confirm your Email account",
        html : "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>" 
    }
    console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function(error, response){
    if(error){
            console.log(error);
        res.end("error");
    }else{
            console.log("Message sent: " + response);
            res.json({success: true, message:"verification code sent ✅"});
        }
    });
});

router.get('/auth/verify', async function(req,res){

    console.log(req.protocol+":/"+req.get('host'));
    if((req.protocol+"://"+req.get('host'))==("http://"+host))
    {
        console.log("Domain is matched. Information is from Authentic email");
        if(req.query.id==rand)
        {
            Query.query(`
            UPDATE users SET verified = 1 WHERE email = ?;
            UPDATE teachers SET verified = 1 WHERE email = ?;`,[mailOptions.to, mailOptions.to], (err, result) => {
                if(err) console.log(err);
                console.log("user verified updated");
            })
            console.log("email is verified");

            //set session 
            const asyncQuery = util.promisify(Query.query).bind(Query); // make query async/await
            // const user = await asyncQuery(`
            // (SELECT * FROM teachers WHERE email = ?) 
            // UNION 
            // (SELECT * FROM users WHERE email = ?); `,[mailOptions.to, mailOptions.to]);
            const user = await userExists(mailOptions.to,'email')
            console.log(user);
            req.session.auth = true;
            req.session.user = await user[0];

            // change rand so user can't go back to the link in the email and verify
            rand = Math.floor(100000 + Math.random() * 900000);

            // res.end("<h1>Email "+mailOptions.to+" is been Successfully verified</h1>");
            res.redirect('/');
        }
        else
        {
            console.log("email is not verified");
            
            res.end("<h1>email is not verified please try to <a href='/auth/login'>login</a> again</h1>");
        }
    }
    else
    {
        res.end("<h1>Request is from unknown source</h1>");
    }
});


 

module.exports = router;