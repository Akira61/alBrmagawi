require('dotenv').config();
const express   = require('express');
const router    = express.Router();
const util      = require('util');
const path      = require('path');
const nodemailer = require("nodemailer");
const { Query } = require('../../../../server');


// load page
router.get('/dashboard/admin/all-students', async(req, res) => {
    // res.render('./dashboards/admin/students/all-students.ejs', {data : users})
    res.sendFile(path.join(__dirname + '../../../../../views/dashboards/admin/students/all-students.html'))
})


router.get('/dashboard/admin/all-students-info', async(req, res) => {
    const asyncQuery = util.promisify(Query.query).bind(Query); // make query async/await
    const users = await asyncQuery(`
    SELECT user_id,first_name, last_name,
    email, phone_number, joining_date FROM users
    `);
    console.log(users);
    // res.render('./dashboards/admin/students/all-students.ejs', {data : users})
    res.json({data : users})
})

module.exports = router;