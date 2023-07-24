require('dotenv').config();
const express   = require('express');
const router    = express.Router();
const util      = require('util');
const path      = require('path');
const nodemailer = require("nodemailer");
const {Query}     = require('../../../server');


router.get('/dashboard/student', (req, res) => {
    res.render('./dashboards/student.ejs')
})

module.exports = router;