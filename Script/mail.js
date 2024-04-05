const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    tls: {
        ciphers: "SSLv3",
    },
    port: 587,
    secure: false,
    auth: {
        user: process.env.MAIL_SENDER,
        pass: process.env.MAIL_PASS
    }
});

class Mail {

    constructor() {
        this.mailOptions = {
            from: {
                address: process.env.MAIL_SENDER,
                name: process.env.COMPANY_NAME
            },
            to: '',
            subject: '',
            text: ''
        };
    }

    setCompanyName(name) {
        this.mailOptions.from.name = name;
    }

    setSenderEmail(email) {
        this.mailOptions.from.address = email;
    }

    setTo(receiver) {
        this.mailOptions.to = receiver;
    }

    setSubject(subject) {
        this.mailOptions.subject = subject;
    }

    setText(text) {
        this.mailOptions.text = text;
    }

    setHTML(html) {
        this.mailOptions.html = html;
    }

    send() {
        try {
            transporter.sendMail(this.mailOptions, (error, info) => {
                if (error) {
                    console.error('Error sending email:', error);
                } else {
                    console.log('Email sent successfully:', info.response);
                }
            });
        } catch (error) {
            console.error('Failed to send email:', error);
            throw error; // Re-throw the error for the caller to handle
        }
    }
}

module.exports = Mail;
