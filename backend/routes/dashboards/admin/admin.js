require('dotenv').config();
const express   = require('express');
const router    = express.Router();
const util      = require('util');
const path      = require('path');
const nodemailer = require("nodemailer");


router.get('/dashboard/admin', (req, res) => {
    res.render('./dashboards/admin.ejs')
})


// Professors routes
    router.use('/', require('./professors/all-professors'));// get all professors
    router.use('/', require('./professors/add-professor')); // add professor
    router.use('/', require('./professors/edit.professor')); // edit professor
    router.use('/', require('./professors/remove-professor')); // delete professor
//End Professors routes

module.exports = router;