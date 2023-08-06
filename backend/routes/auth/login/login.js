require('dotenv').config();
const express   = require('express');
const router    = express.Router();
const session   = require('express-session');
const bcrypt    = require('bcrypt');
const util = require("util");
const {Query}     = require('../../../server');
const { userExists } = require('../functions');


router.get('/auth/login', (req, res) => {
    //check if user already loggedin
    if (req.session.auth){
        return res.redirect('/');
    }
    res.render('./auth/login.ejs');
})


router.post('/auth/login', async(req, res) => {
    console.log(req.body)

    //check if user already loggedin
    if (req.session.auth){
        return res.redirect('/');
    }

    //check if if all data recived
    if (!req.body.email || !req.body.password){
        return res.json({err_message : "Please Complete The Fields"});
    }
    
    const email = req.body.email;
    const password = req.body.password;

    //check if email is valid
    const emailRegx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(!emailRegx.test(email)){
        return res.json({err_message : "Email is unvalid. Please Write your Email correctly"})
    }

    // check if user or teacher exists
    const asyncQuery = util.promisify(Query.query).bind(Query); // make query async/await
    // const user = await asyncQuery(`
    // (SELECT * FROM teachers WHERE email = ?) 
    // UNION 
    // (SELECT * FROM users WHERE email = ?); 
    // `, [email,email]);
    const user = await userExists(email, 'email');
    console.log("%".repeat(29), user)
    //const user = await asyncQuery(`SELECT * FROM users WHERE email= ?;`, [email]);
    //const teacher = await asyncQuery(`SELECT * FROM teachers WHERE email= ?;`, [email]);
    // console.log("-".repeat(30),user);
    if (user.length == 0 ){
        return res.json({err_message : "User not found. Please Try To Sign Up"})
    }

    // compare passwords
    const compare = await bcrypt.compare(password, user[0].password);
    if(!compare){
        return res.json({err_message : "Uncorrect password"});
    }

    //check if user is verified
    if(user[0].verified == 0){
        // redirect to verify email
        return res.redirect(`/auth/verify-code?to=${user[0].user_id}`);
    }

    //set session 
    req.session.auth = true;
    req.session.user = await user[0];
    
    if(user[0].role == 'student'){
        return res.redirect('/dashboard/student');
    }
    else if(user[0].role == 'teacher'){
        return res.redirect('/dashboard/teacher');
    }
    else if(user[0].role == 'admin'){
        return res.redirect('/dashboard/admin');
    }
    res.redirect('/');
})


module.exports = router;
