require('dotenv').config();
const express   = require('express');
const router    = express.Router();
const util      = require('util');
const path      = require('path');
const nodemailer = require("nodemailer");
const bcrypt    = require('bcrypt');
const {v4 : uuid} = require('uuid');
const { userExists } = require('../../../auth/functions');
const { Query } = require('../../../../server');
const { URLs } = require('../../../../url.config');


router.get('/dashboard/admin/edit-student', async(req, res) => {
    console.log(req.query.user_id);
    if(!req.query.user_id){
        return res.json({err_message : "no studnet data sent"});
    }

    const user = await userExists(req.query.user_id, 'user_id');
    if(user.length ==0){
        return res.json({err_message : 'user not found'});
    }

    console.log(user);
    res.render('./dashboards/students/edit-student.ejs', {data : user});
})



router.post('/dashboard/admin/edit-student', async (req, res) => {
    console.log(req.body);
    if(!req.query.user_id){
        return res.json({err_message : "no professor id sent"});
    }

    //check if all data sent
    if(!req.body.firstName || !req.body.lastName ||!req.body.email){
    
        return res.json({err_message : "Please Complete The Form"});
    }

    const {firstName,lastName,email} = req.body;

    // check if email already taking beside the current user
    const user = await userExists(email, 'email');
    if(user.length >0 && user[0].user_id !== req.query.user_id){
        return res.json({err_message : "email already taking"});
    }

    // //phone number onely numbers
    // const numberRegx = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
    // if(!numberRegx.test(req.body.number)){
    //     return res.json({err_message : "unvalid phone number. Please Type yours correctly"});
    // }

    // // check if phone number already exists in teachers DB
    // const asyncQuery = util.promisify(Query.query).bind(Query); // make query async/await
    // const phoneExists = await asyncQuery(`SELECT * FROM teachers WHERE phone_number= ? AND user_id !=?`,[req.body.number,req.query.user_id]);
    // if(phoneExists.length >0){
    //     return res.json({err_message : "Phone Number Already taking"});
    // }

    //validate email
    const emailRegx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(!emailRegx.test(req.body.email)){
        return res.json({err_message : "Email is unvalid. Please Write your Email correctly"})
    }

    // // gender should be one of the list [male, female]
    // const genderList = ['male','female'];
    // if(!genderList.includes(req.body.gender.toLowerCase())){
    //     return res.json({err_message : "Please choose a correct gender"});
    // }

    Query.query(`
    UPDATE users SET 
    first_name =?, last_name =?, email=?
    WHERE user_id=?;
    `,[firstName,lastName,email, req.query.user_id], (err, result) => {
        if(err) throw err;
        console.log('data updated ✅');
        res.redirect(URLs.dashboards.admin.students.all)
    })

})
module.exports = router;