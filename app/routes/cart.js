require('dotenv').config();
const express   = require('express');
const router    = express.Router();
const util      = require('util');
const path      = require('path');
const nodemailer = require("nodemailer");
const {Query, asyncQuery}     = require('../server');
const fetch     = require('node-fetch');
const request = require('request');
const axios = require('axios');


class Gateway{
    
    constructor(baseURL, token){
        this.baseURL = process.env.payment_base_url;
        this.token = process.env.payment_token;
    }

    async sendPayment(uri, bodyData){

        // payment request config
        const option = {
            method : 'POST',
            url : this.baseURL + uri, // '/v2/SendPayment'
            headers : {
                Accept: 'application/json',
                Authorization: 'Bearer '+this.token,
                'Content-Type': 'application/json'
            },
            body :JSON.stringify(bodyData),
            json : true
        }
        
        const res = await fetch(this.baseURL + uri,option)
        const paymentPage = await res.json();
        // console.log(paymentPage.Data.InvoiceURL)
        return paymentPage

        // request(option, async(error, response, body)=> {
        //     if(error) throw new Error(error);
        //     console.log(body.Data.InvoiceURL)
        //     return body.Data.InvoiceURL
        // })
    }
}



router.get('/cart', (req, res) => {
    res.sendFile(path.join(__dirname + '../../views/cart.html'))
})


router.post('/gateway', async(req,res)=> {

    if(!req.body.productID) return res.status(500).send("no product sent")
    const {productID} = req.body;
    console.log(productID);

    // validate product price and info
    const course = await asyncQuery(`
    SELECT * FROM courses WHERE course_id=?;
    `, [productID]);
    if(course.length ===0) return res.status(500).send("no product sent");

    // send payment
    const baseURL = process.env.payment_base_url;
    const token = process.env.payment_token;
    const gateway = new Gateway(baseURL, token);
 
    const paymentPage = await gateway.sendPayment('/v2/SendPayment', {
        NotificationOption: 'LNK',
        CustomerName: req.session.user.first_name || 'Fahad',
        DisplayCurrencyIso: 'USD',
        CustomerEmail: req.session.user.email || 'fahad@fahad.com',
        InvoiceValue: course[0].price,
        CallBackUrl: process.env.payment_success_url,
        ErrorUrl: process.env.payment_failed_url,
        Language: 'en',
    })
    console.log(paymentPage)
    // check if response is success
    if(paymentPage.IsSuccess){
        const {InvoiceId} = paymentPage.Data;
        return res.json({url : paymentPage.Data.InvoiceURL})
       //return res.redirect(paymentPage.Data.InvoiceURL);
    }
})

// '/payment/success'
router.get('/payment/success', (req,res)=> {
    res.status(200).send('you paied successfully ✅')
})

// '/payment/failed'
router.get('/payment/failed', (req,res)=> {
    res.status(404).send('your payment failed ❌. please try again')
})


module.exports = router;