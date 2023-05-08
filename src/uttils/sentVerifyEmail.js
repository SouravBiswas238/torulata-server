import nodemailer from "nodemailer";

const sentVerifyEmail = async (adminEmail) => {




    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.NODEMAILER_APP_SENT_EMAIL,
            pass: process.env.NODEMAILER_APP_SENT_PASS
        }
    });

    const mailOptions = {
        from: process.env.NODEMAILER_APP_SENT_EMAIL,
        to: adminEmail,
        subject: 'Verify your email account',
        text: 'Email content hear'
    };

    try {
        const result = await transporter.sendMail(mailOptions)
        console.log(result);
    } catch (error) {
        console.log("sent mail", error.message)

    }





}

export default sentVerifyEmail