const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Nodemailer configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'salunke9393@gmail.com', // Replace with your email
        pass: 'Ashish_@24' // Replace with your email password or app password
    }
});

// POST route to handle form submission and send email
app.post('/send', (req, res) => {
    const { name, email, phone, message } = req.body;

    const mailOptions = {
        from: email,
        to: 'salunke9393@gmail.com', // Your receiving email
        subject: `New Contact Form Submission from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send({ message: "Form Submission Failed! Try Again", error });
        }
        res.status(200).send({ message: "Form Submitted Successfully", response: info.response });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
