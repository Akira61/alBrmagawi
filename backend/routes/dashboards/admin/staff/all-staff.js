require('dotenv').config();
const express   = require('express');
const router    = express.Router();
const util      = require('util');
const path      = require('path');
const nodemailer = require("nodemailer");
const { Query } = require('../../../../server');


router.get('/dashboard/admin/all-staff', async(req, res) => {
    const asyncQuery = util.promisify(Query.query).bind(Query); // make query async/await
    const users = await asyncQuery(`
    SELECT user_id,first_name, last_name,
    email, phone_number, role, joining_date
    FROM staff
    `);
    console.log(users);
    res.render('./dashboards/staff/all-staff.ejs', {data : users})
})

module.exports = router;