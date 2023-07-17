require('dotenv').config();
const express   = require('express');
const router    = express.Router();
const util      = require('util');
const path      = require('path');
const nodemailer = require("nodemailer");
const { Query } = require('../../../../server');


// all Professors
router.get('/dashboard/all-professors', async(req, res) => {
    const asyncQuery = util.promisify(Query.query).bind(Query); // make query async/await
    const teachers = await asyncQuery(`
    SELECT first_name, last_name, phone_number,
    email, gender, designation, department, education,
    birth_day FROM teachers
    `);
    console.log(teachers);
    res.render('./dashboards/Professors/all-professors.ejs', {data : teachers})
})



module.exports = router;