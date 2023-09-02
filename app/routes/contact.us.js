require('dotenv').config();
const express   = require('express');
const router    = express.Router();
const util      = require('util');
const path      = require('path');
const nodemailer = require("nodemailer");
const {Query}     = require('../server');


router.get('/contact', (req, res) => {
    // res.render('contact.us.ejs', 
    // req.session.auth?{email : req.session.user.email}:{email : false});
    res.sendFile(path.join(__dirname + '../../views/contact.us.html'))
})

// get user email and name and past it in the contact form
router.get('/contact/userInfo', (req, res) => {
    res.json(
        req.session.auth?
        {
            email : req.session.user.email,
            name:req.session.user.first_name+' '+req.session.user.last_name
        }
        :{email : false}
    );
})


router.post('/contact', (req, res) => {
    console.log(req.body);

    if(!req.body.name || !req.body.email || !req.body.message){
        return res.json({err_message : "Please Complete The From"});
    }

    const {name, email, message} = req.body;

    //message limit
    if(message.length >1000){
        return res.json({err_message: "the message is too long"})
    }

    // insert data
    Query.query(`
    INSERT INTO contact 
    (name, email, message , date)
    VALUES (?, ?, ?, ?);`, 
    [name, email, message, new Date()], (err, result) => {
        if(err) throw err;
        console.log('conatct saved')
        res.redirect('/');
        // res.json({success : true});
    })
})
module.exports = router;