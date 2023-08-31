require('dotenv').config();
const express   = require('express');
const router    = express.Router();
const util      = require('util');
const path      = require('path');
const nodemailer = require("nodemailer");
const {Query, asyncQuery}     = require('../server');
const fetch     = require('node-fetch');
const request = require('request');
const { loginRequirement } = require('../auth/basicAuth');


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
    
    // send request to gateway api to get paymentPage for the product
    const paymentPage = await gateway.sendPayment('/v2/SendPayment', {
        NotificationOption: 'LNK',
        CustomerName: 'fahad',//req.session.user.first_name+' '+req.session.user.last_name,
        DisplayCurrencyIso: 'USD',
        CustomerEmail: 'fahad@fahad.com', //req.session.user.email,
        CustomerReference : /*Date.now(),*/ 6, //req.session.user.id,
        InvoiceValue: course[0].price,
        CallBackUrl: process.env.payment_success_url /*+ `?course=${productID}` */,
        ErrorUrl: process.env.payment_failed_url,
        Language: 'en',
        UserDefinedField : course[0].id,
        InvoiceItems: [ { ItemName: course[0].title, Quantity: 1, UnitPrice: course[0].price,  } ],
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
router.get('/payment/success', async(req,res)=> {

    // check invoice status
    const {paymentId} = req.query;
    const payload = {
        url: process.env.payment_base_url+'/v2/getPaymentStatus',
        method : 'POST',
        headers : {
            Accept: 'application/json',
                Authorization: 'Bearer '+process.env.payment_token,
                'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'Key' : req.query.paymentId,
            'KeyType' : 'paymentId'
        }),
        json : true
    } 
    const uri = process.env.payment_base_url+'/v2/getPaymentStatus'
    const response = await fetch(uri,payload)
    const invoice = await response.json();
    console.log(invoice)
    console.log(invoice.Data.InvoiceItems);
    
    // find if invoice id already exists 
    const invoiceExists = await asyncQuery(`
    SELECT * FROM orders WHERE payment_id=?;
    `, [paymentId]);
    
    if(invoiceExists.length > 0){
        return res.status(403).send('invoice already exists');
    }

    // if user paied and invoice not in DB insert order
    if(invoice.IsSuccess){
        // insert data
        const order = await asyncQuery(`
        INSERT INTO orders (
            course_id,
            user_id,
            payment_id,
            payment_data,
            date
        ) VALUES (?,?,?,?,?)
        `, [parseInt(invoice.Data.UserDefinedField),
            parseInt(invoice.Data.CustomerReference),
            paymentId,
            JSON.stringify(invoice),
            invoice.Data.CreatedDate
        ])

        console.log(order)
        return res.status(200).json({success:true})
    }
    // request({
    //     url: process.env.payment_base_url+'/v2/getPaymentStatus',
    //     method : 'POST',
    //     headers : {
    //         Accept: 'application/json',
    //             Authorization: 'Bearer '+process.env.payment_token,
    //             'Content-Type': 'application/json'
    //     },
    //     body: {
    //         'Key' : req.query.paymentId,
    //         'KeyType' : 'paymentId'
    //     },
    //     json : true
    // }, (err, response, body)=> {
    //     if(err) throw new Error(err);
    //     console.log(body);
    //     console.log(body.Data.InvoiceItems)
    //     res.status(200).json(body)
    // });

    // success message
    //res.status(200).json(req.query)
})

// '/payment/failed'
router.get('/payment/failed', (req,res)=> {
    res.status(404).send('your payment failed ❌. please try again')
})


module.exports = router;
