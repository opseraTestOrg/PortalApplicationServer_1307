const nodemailer = require('nodemailer');
var config =  require('../config/config');

module.exports.sendmail = function (text, message, res, err, email, sub) {

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        
        service:'gmail',
         // secure:true for port 465, secure:false for port 587
        auth: {
            user: config.emailUser,
            pass: config.emailPassword
        }
    });
    
    // setup email data with unicode symbols
    let mailOptions = {
        from: "opseraservice@gmail.com", // sender address
        to: email, // list of receivers
        subject: sub, // Subject line
        text: message + text  // plain text body
     
    };
    
    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
    });
    };