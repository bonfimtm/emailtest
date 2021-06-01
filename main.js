'use strict';

const nodemailer = require('nodemailer');


// async..await is not always allowed in global scope, must use a wrapper
(async function () {

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: parseInt(process.env.MAIL_PORT),
        secure: true,
        auth: {
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD,
        },
    });

    const currentDate = new Date().toString();

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: `'${process.env.MAIL_FROM_NAME}' <${process.env.MAIL_FROM_ADDRESS}>`, // sender address
        to: process.env.MAIL_TO_ADDRESSES, // list of receivers
        subject: 'Email test 📧', // Subject line
        text: `Email sent at\n${currentDate}`, // plain text body
        html: `<meta charset='utf-8'/><h1>This is an email test 📯</h1><br><pre>${currentDate}<pre>`, // html body
    });

    console.log('Message sent: %s', info.messageId);

})().catch(console.error);
