
// This Handles Sending of Mails
const nodemailer = require('nodemailer')

// using mailtrap as a fake email sending service
const sendEmail = async (options)=>{
    // console.log(options)
    //1- create a teansporter
    const transporter = nodemailer.createTransport({
        // host: process.env.EMAIL_HOST,
        // port: process.env.EMAIL_PORT,
        service : "gmail",
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD
        }
    });


    //2- define email options
    const mailOptions = {
        from: options.from,
        to: options.email,
        subject: options.subject,
        html: options.message,
        // html
    }

    //3- actually send the email
    await transporter.sendMail(mailOptions)
}

module.exports= sendEmail;