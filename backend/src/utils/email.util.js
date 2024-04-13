import nodemailer from 'nodemailer';

const emailSender = async ({ emailToSend, otp }) => {

    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            debug: true,
            logger: true,
            port: 465,
            secure: true,
            secureConnection: true,
            auth: {
                user: process.env.EMAIL_ADDRESS,
                pass: process.env.EMAIL_PASSWORD
            },
            tls: {
                rejectUnAuthorized: true,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_ADDRESS,
            to: emailToSend,
            subject: "Otp For View Your Password",
            html: `<h1>Your OTP is:</h1><p>${otp}</p>`
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
        return 200; // Return success status code
    } catch (error) {
        console.error('Error sending email:', error);
        return 409; // Return conflict status code in case of error
    }
};

export default emailSender;
