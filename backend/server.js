require('dotenv').config();
const express   = require("express");
const app       = express();
const path      = require("path");
const helmet    = require('helmet');
const mysql     = require('mysql');
const PORT      = process.env.PORT || 4545;

//middleware
    app.use(express.json({limit : '50mb'}));
    app.use(express.urlencoded({extended: true}));
    app.use("/public",express.static('public'));
    app.use(helmet());
    app.set('view engine', 'ejs');
// End middlewares

//database
    const mysqlQuery = mysql.createConnection({
        host : process.env.MYSQL_HOST,
        user : process.env.MYSQL_USER,
        password : process.env.MYSQL_PASSWORD,
        database : process.env.MYSQL_DBNAME,
    })
    module.exports.Query = mysqlQuery;
//End database


//Routes
app.get('/hi', (req, res) => {
    res.send('<h1> Hi 👽 </h1>');
})


//register
app.use('/', require('./routes/auth/register/register'));
// send verification code
app.use('/', require('./routes/auth/verify'));
// login
app.use('/', require('./routes/auth/login/login'));


app.listen(PORT, ()=> console.log(`Listening on http://127.0.0.1:${PORT}`));