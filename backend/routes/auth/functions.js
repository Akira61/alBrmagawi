require('dotenv').config();
const express   = require('express');
const router    = express.Router();
const util      = require('util');
const path      = require('path');
const nodemailer = require("nodemailer");
const {Query}     = require('../../server');



module.exports.userExists = async function userExists(value, column){
    console.log("^".repeat(3),value)
    // check if user exists
    const asyncQuery = util.promisify(Query.query).bind(Query); // make query async/await
    let user=[];
    const query = await asyncQuery(`
    SELECT * FROM teachers WHERE ${column} = ?;
    SELECT * FROM users WHERE ${column} = ?; 
    `, [value,value]);
    query.map(e => {
        if(e.length >0){
            user = e;
        }
    })
    console.log(user)
    return user;
}

