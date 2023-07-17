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


router.delete('/dashboard/delete-professor', async(req, res)=> {
    if(!req.query.user_id){
        return res.send("Please specify a professor");
    }
    const user = await userExists(req.query.user_id, 'user_id');

    if(user.length == 0){
        return res.send("unvalid id");
    }

    Query.query(`DELETE FROM teachers WHERE user_id=?`,[req.query.user_id], (err, result)=> {
        if(err) throw err;
        console.log('professor deleted ✅');
        res.redirect('/dashboard/all-professors');
    })

})

module.exports = router;