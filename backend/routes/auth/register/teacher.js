require('dotenv').config();
const express   = require('express');
const router    = express.Router();
const bcrypt    = require('bcrypt');
const util = require("util");
const nodemailer = require("nodemailer");
const {v4 : uuid} = require("uuid");
const {Query}     = require('../../../server');


router.get('/auth/register/teacher', (req, res) => {
    res.render('./auth/teacher.register.ejs');
});

module.exports = router;