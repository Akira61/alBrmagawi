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


router.delete('/dashboard/admin/delete-student', async(req, res)=> {
    if(!req.query.user_id){
        return res.send("Please specify a student");
    }
    const user = await userExists(req.query.user_id, 'user_id');

    if(user.length == 0){
        return res.send("unvalid id");
    }

    Query.query(`DELETE FROM users WHERE user_id=?`,[req.query.user_id], (err, result)=> {
        if(err) throw err;
        console.log('student deleted ✅');
        res.redirect(URLs.dashboards.admin.students.all);
    })

})

module.exports = router;