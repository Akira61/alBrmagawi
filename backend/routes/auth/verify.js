require('dotenv').config();
const express   = require('express');
const router    = express.Router();
const util      = require('util');
const path      = require('path');
const nodemailer = require("nodemailer");
const {Query}     = require('../../server');

/*
    Here we are configuring our SMTP Server details.
    STMP is mail server which is responsible for sending and recieving email.
    */
    const smtpTransport = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "dafrfhd36@gmail.com",
            pass: "D3a1F4r4F4h6D336"
        }
    });
    let rand,mailOptions,host,link;
/*------------------SMTP Over-----------------------------*/
 
router.get('/auth/verify-code', async function(req,res){
    if(!req.query.to) return res.send('no email sent');

    // check if user exists
    const asyncQuery = util.promisify(Query.query).bind(Query); // make query async/await
    const user = await asyncQuery(`SELECT * FROM users WHERE user_id='${req.query.to}'`);
    console.log(user);
    if(user.length == 0 || user[0].verified ==1){
        return res.json({err_message: 'user not found'})
    }
  
    // generate random token
    rand = Math.floor(100000 + Math.random() * 900000);
    host =req.get('host');
    link ="http://"+req.get('host')+"/auth/verify?id="+rand;
    mailOptions={
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
        res.end("verification code sent ✅");
        }
    });
});

router.get('/auth/verify',function(req,res){
    console.log(req.protocol+":/"+req.get('host'));
    if((req.protocol+"://"+req.get('host'))==("http://"+host))
    {
        console.log("Domain is matched. Information is from Authentic email");
        if(req.query.id==rand)
        {
            console.log("email is verified");
            res.end("<h1>Email "+mailOptions.to+" is been Successfully verified</h1>");
            Query.query(`UPDATE users SET verified = 1 WHERE email = '${mailOptions.to}'`, (err, result) => {
                if(err) console.log(err);
                console.log("user verified updated");
            })
        }
        else
        {
            console.log("email is not verified");
            res.end("<h1>email is not verified</h1>");
        }
    }
    else
    {
        res.end("<h1>Request is from unknown source</h1>");
    }
});


 

function sendEmail(email){
    /*
    Here we are configuring our SMTP Server details.
    STMP is mail server which is responsible for sending and recieving email.
    */
    const smtpTransport = nodemailer.createTransport("SMTP",{
        service: "Gmail",
        auth: {
            user: "dafrfhd36@gmail.com",
            pass: "D3a1F4r4F4h6D336"
        }
    });
    let rand,mailOptions,host,link;
    /*------------------SMTP Over-----------------------------*/
    rand=Math.floor((Math.random() * 100) + 54);
    host=req.get('host');
    link=process.env.HOST +"/verify?id="+rand;
    mailOptions={
        to : email,
        subject : "Please confirm your Email account",
        html : "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>" 
    }
    console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function(error, response){
    if(error){
        console.log(error);
        //res.end("error");
    }else{
        console.log("Message sent: " + response.message);
        //res.end("sent");
    }
});
}

module.exports = router;