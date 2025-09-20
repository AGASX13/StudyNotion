// const nodemailer = require("nodemailer");

// const mailSender = async (email, title, body) => {
//     try{
//             let transporter = nodemailer.createTransport({
//                 host:process.env.MAIL_HOST,
//                 auth:{
//                     user: process.env.MAIL_USER,
//                     pass: process.env.MAIL_PASS,
//                 }
//             })


//             let info = await transporter.sendMail({
//                 from: 'StudyNotion || CodeHelp - by Babbar',
//                 to:`${email}`,
//                 subject: `${title}`,
//                 html: `${body}`,
//             })
//             console.log(info);
//             return info;
//     }
//     catch(error) {
//         console.log(error.message);
//     }
// }


// module.exports = mailSender;

const { Resend } = require('resend');
require("dotenv").config();

const mailSender = async (email, title, body) => {
    // Create a new Resend instance with the API key from Render
    const resend = new Resend(process.env.RESEND_API_KEY);

    try {
        await resend.emails.send({
            from: 'onboarding@resend.dev', // This is Resend's default email for free tier, it works out of the box!
            to: email, // Recipient's email address
            subject: title,
            html: body,
        });
        console.log(`Email sent successfully to ${email} via Resend`);
        return true; // Return true on success

    } catch (error) {
        console.error('Error sending email via Resend');
        console.error(error);
        return false; // Return false on failure
    }
};

module.exports = mailSender;