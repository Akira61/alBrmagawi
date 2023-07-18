require('dotenv').config();
const express   = require('express');
const router    = express.Router();
const util      = require('util');
const path      = require('path');
const nodemailer = require("nodemailer");
const { Query } = require('../../../../server');


router.get('/dashboard/admin/all-student', async(req, res) => {
    const asyncQuery = util.promisify(Query.query).bind(Query); // make query async/await
    const users = await asyncQuery(`
    SELECT user_id,first_name, last_name,
    email FROM users
    `);
    console.log(users);
    res.render('./dashboards/students/all-students.ejs', {data : users})
})

module.exports = router;