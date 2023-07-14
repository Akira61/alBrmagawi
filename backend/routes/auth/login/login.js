require('dotenv').config();
const express   = require('express');
const router    = express.Router();
const path      = require('path');
const bcrypt    = require('bcrypt');
const util = require("util");
const nodemailer = require("nodemailer");
const {v4 : uuid} = require("uuid");
const {Query}     = require('../../../server');


router.get('/auth/login', (req, res) => {
    //check if user already loggedin
    res.render('./auth/login.ejs');
})


router.post('/auth/login', (req, res) => {
    
})

module.exports = router;
