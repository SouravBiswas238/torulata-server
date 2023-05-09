import nodemailer from "nodemailer";

const sentEmail = async (email, mailFormate) => {

    // create transport
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.NODEMAILER_APP_SENT_EMAIL,
            pass: process.env.NODEMAILER_APP_SENT_PASS
        }
    });

    // sent mail options
    const mailOptions = {
        from: process.env.NODEMAILER_APP_SENT_EMAIL,
        to: email,
        subject: 'Verify your email account',
        html: mailFormate
    };

    try {
        //sent mail hear
        await transporter.sendMail(mailOptions)
    } catch (error) {
        console.log("sent mail", error.message)
    }

}

export default sentEmail