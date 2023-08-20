require('dotenv').config();
const express   = require('express');
const router    = express.Router();
const bcrypt    = require('bcrypt');
const util = require("util");
const nodemailer = require("nodemailer");
const {v4 : uuid} = require("uuid");
const {Query}     = require('../../../server');


// registration option student/teacher
router.get('/auth/register/option', (req, res) => {
    res.render('./auth/register.option.ejs')
})

router.post('/auth/register/option', (req, res) => {
    console.log(req.body);

    if(req.body.option == 'student'){
        return res.redirect('/auth/register');
    }
    res.redirect('/auth/register/teacher');
})


module.exports = router;