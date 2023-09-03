require('dotenv').config();
const express   = require('express');
const router    = express.Router();
const util      = require('util');
const path      = require('path');
const nodemailer = require("nodemailer");
const { Query } = require('../../../../server');


// load the page
router.get('/dashboard/admin/professor/accept-denaied', async(req, res) => {
    // res.render('./dashboards/admin/Professors/accept-professor.ejs', {data : teachers})
    res.sendFile(path.join(__dirname + '../../../../../views/dashboards/admin/Professors/accept-professor.html'))
})

// all Professors with 0 accepted
router.get('/dashboard/admin/professor/accept-denaied-info', async(req, res) => {
    const asyncQuery = util.promisify(Query.query).bind(Query); // make query async/await
    const teachers = await asyncQuery(`
    SELECT user_id,first_name, last_name, phone_number,
    email, gender, designation, department, education,
    birth_day, joining_date FROM teachers WHERE accepted = 0
    `);
    console.log(teachers);
    // res.render('./dashboards/admin/Professors/accept-professor.ejs', {data : teachers})
    res.json({data : teachers});
})


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
 

router.get('/dashboard/admin/professor/accept-denaied/:userID/:option', async (req,res) => {
    
    // check if values sent
    if(!req.params.userID || !req.params.option){
        return res.json({err_message : "No values sent"});
    }

    const {userID, option} = req.params;

    //check if teacher id exists
    const asyncQuery = util.promisify(Query.query).bind(Query); // make query async/await
    const teacher = await asyncQuery(`SELECT * FROM teachers WHERE user_id = ?;`, [userID]);
    if(teacher.length == 0){
        return res.json({err_message : "Teacher ID Not Found"});
    }

    // check if option is valied
    const allowedOptions = ['accept', 'denied'];
    if(!allowedOptions.includes(option)){
        return res.json({err_message : "unvalid option"})
    }

    // check if option was accept
    if(option == allowedOptions[0]){
        const asyncQuery = util.promisify(Query.query).bind(Query); // make query async/await
        const accept = await asyncQuery(`UPDATE teachers SET accepted = 1 WHERE user_id =?;`, [userID]);
        return res.json({success : true});
    }

    //send email to the teacher that he got rejected
    mailOptions={
        from : process.env.SMTP_email,
        to : await teacher[0].email,
        subject : "Your request on uplaing to us",
        html : `Hello,${teacher[0].first_name} <br> We are very sorry to tell you that you got rejected` 
    }
    console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function(error, response){
        if(error){
            console.log(error);
            res.end("error when trying to send reject email to the teacher");
        }else{
            console.log("Message sent: " + response);
        }
    })

    // put the teacher on users table
    const newUser = await asyncQuery(`
    INSERT INTO users(
     user_id, first_name, last_name,
    email, password,verified, joining_date
    )
    VALUES( ?, ?, ?,?, ?, ?, ?);`
    , [userID, teacher[0].first_name, 
    teacher[0].last_name, teacher[0].email, 
    teacher[0].password, teacher[0].verified,
    teacher[0].joining_date]);

    // remove teacher from teachers table
    await asyncQuery(`
    DELETE FROM teachers WHERE user_id = ?;
    `, [userID])
})


module.exports = router;