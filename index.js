const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/send-message", (req, res) => {
  
  const { name, email, phone, message } = req.body;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.MAIL_NAME,
      pass: process.env.PASS_VALUE,
    },
  });

  const mailOptions = {
    from: email,
    to: "your-email@gmail.com",
    subject: `New message from ${name}`,
    text: `
      Name: ${name}
      Email: ${email}
      Phone: ${phone}
      Message: ${message}
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.status(500).send("Error sending message");
    } else {
      res.status(200).send("Message sent successfully");
    }
  });
});

app.listen(3000, () => console.log("Server listening on port 3000"));
