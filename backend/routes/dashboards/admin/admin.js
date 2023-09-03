require('dotenv').config();
const express   = require('express');
const router    = express.Router();
const util      = require('util');
const path      = require('path');
const nodemailer = require("nodemailer");



router.get('/dashboard/admin',isAdmin, (req, res) => {
    // res.render('./dashboards/admin/admin.ejs')
    res.sendFile(path.join(__dirname + '../../../../views/dashboards/admin/admin.html'))
})
 

// Professors route
    router.use('/', require('./professors/all-professors'));// get all professors
    router.use('/', require('./professors/add-professor')); // add professor
    router.use('/', require('./professors/accept-professor')); // accept or deniaed professor
    router.use('/', require('./professors/edit.professor')); // edit professor
    router.use('/', require('./professors/remove-professor')); // delete professor
//End Professors routes

// students route
    router.use('/', require('./students/all-students')); //get all students
    router.use('/', require('./students/add-student')); // add student
    router.use('/', require('./students/edit-student')); //edit student
    router.use('/', require('./students/remove-student')); //delete student
//End student route

// Staff routes
    router.use('/', require('./staff/all-staff')); // get all staff
    router.use('/', require('./staff/add-staff')); // add staff
    router.use('/', require('./staff/edit-staff')); // edit staff
    router.use('/', require('./staff/remove-staff')); // remove staff
// End staff routes


function isAdmin(req, res, next){
    // console.log(req.session.user)
    // if(!req.session.auth){
    //     return res.redirect('/')
    // }
    // if(req.session.user.role == 'admin'){
    //     return next();
    // }
    //return res.redirect('/');
    next()
}
module.exports = router;