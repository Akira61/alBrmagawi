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


router.get('/dashboard/admin/add-staff', (req, res) => {
    res.render('./dashboards/staff/add-staff.ejs');
})


router.post('/dashboard/admin/add-staff', async(req, res) => {
    console.log(req.body);

    if(!req.body.firstName || !req.body.lastName|| 
        !req.body.number ||!req.body.email ||
        !req.body.password || !req.body.role ){

        return res.json({err_message : "Please Complete The Form"});
    }

        //phone number onely numbers
        const numberRegx = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
        if(!numberRegx.test(req.body.number)){
            return res.json({err_message : "unvalid phone number. Please Type yours correctly"});
        }
    
        // check if phone number already exists in teachers DB
        const phoneExists = await userExists(req.body.number, 'phone_number')
        if(phoneExists.length >0){
            return res.json({err_message : "Phone Number Already taking"});
        }
    
        //validate email
        const emailRegx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(!emailRegx.test(req.body.email)){
            return res.json({err_message : "Email is unvalid. Please Write your Email correctly"})
        }
    
        //check if email already exists in teachers and users DB
        const user = await userExists(req.body.email, 'email');
        if(user.length >0){
            return res.json({err_message : "Email already taking"});
        }
    
        //password not less then 6 figirs
        if(req.body.password < 6){
            return res.json({err_message : "Password must be at lest 6 characters"});
        }
    
        // hash password
        const hashedPass = await bcrypt.hash(req.body.password, 10);
    
        // // gender should be one of the list [male, female]
        // const gender = ['male','female'];
        // if(!gender.includes(req.body.gender.toLowerCase())){
        //     return res.json({err_message : "Please choose a correct gender"});
        // }

        //verified value
        if(req.body.verified == null){
            req.body.verified = 0;
        }else{
            req.body.verified = 1;
        }
        
        //insert data
        Query.query(`
        INSERT INTO staff 
        (user_id, first_name, last_name ,
        phone_number,email, password,
        role, verified, joining_date)
        VALUES (?,?,?, ?, ?,?, ?, ?, ?);`,
        [uuid(), req.body.firstName, req.body.lastName,
            req.body.number,req.body.email,
            hashedPass, req.body.role,req.body.verified, new Date()
        ], (err, result) => {
            if(err) throw err;
            console.log("staff added successfully ✅");
            res.redirect(URLs.dashboards.admin.staff.all);
        })

})


module.exports = router;