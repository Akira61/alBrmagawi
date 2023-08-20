require('dotenv').config();
const express   = require("express");
const app       = express();
const session   = require('express-session');
const path      = require("path");
const helmet    = require('helmet');
const mysql     = require('mysql2');
const cors      = require('cors');
const multer    = require('multer');
const PORT      = process.env.PORT || 4545;

//middleware
    app.use(express.static('public'));
    app.use(cors({origin: process.env.HOST }))
    app.use(express.json(/*{limit : '50mb'}*/));
    app.use(express.urlencoded({extended: true}));
    app.use(helmet({contentSecurityPolicy: false}));
    app.set('view engine', 'ejs');
// End middlewares

//database
    const mysqlQuery = mysql.createConnection({
        host : process.env.MYSQL_HOST,
        user : process.env.MYSQL_USER,
        password : process.env.MYSQL_PASSWORD,
        database : process.env.MYSQL_DBNAME,
        multipleStatements : true //  to prevent sql injection to run more then one command
    })
    module.exports.Query = mysqlQuery;
//End database


// session
const ROLES = { // all the session roles 
    ADMIN : 'admin',
    TEACHER : 'teacher',
    STUDENT : 'student',
}
module.exports.ROLES = ROLES;

app.use(session({
    secret : process.env.session_secret,// random characters for hashing the session
    // resave : false,
    //to prevent setting a new session every request
    saveUninitialized : false,
    // cookie : {
    //     //maxAge :  14 * 24 * 3600000,// 14 days
         secure: app.get('env') === 'production'?true:false,
    // },
}))


// File system
const storage = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null, "./public/uploads");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + file.originalname.split(' ').join('');
        cb(null, file.fieldname + '-' + uniqueSuffix)
      }
});
const upload = multer({storage : storage})//save files in puloads 
module.exports.Upload = upload;
// End file system


//Routes
app.get('/hi', (req, res) => {
    res.send('<h1> Hi 👽 </h1>');
})


//register
app.use('/', require('./routes/auth/register/register'));

//register option
app.use('/', require('./routes/auth/register/options'));

//teacher register
app.use('/', require('./routes/auth/register/teacher'));
// send verification code
app.use('/', require('./routes/auth/verify'));

// login
app.use('/', require('./routes/auth/login/login'));

//fotgot password
app.use('/', require('./routes/auth/forgot-password'))

//contact us
app.use('/', require('./routes/contact.us'));

// student dashboard
app.use('/', require("./routes/dashboards/student/student"));

// admin dashboard
    app.use('/', require("./routes/dashboards/admin/admin"));
//End admin dashboard

// teacher dashboard
    app.use('/', require('./routes/dashboards/teacher/teacher'))
//End teacher dashboard

app.listen(PORT, ()=> console.log(`Listening on http://127.0.0.1:${PORT}`));