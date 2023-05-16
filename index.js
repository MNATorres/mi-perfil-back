const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.post("/send-message", (req, res) => {
  
  const { name, email, phone, message } = req.body;

  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'della96@ethereal.email',
        pass: 'mP26CtXD9mAftqmqWP'
    }
});

  const mailOptions = {
    from: 'della96@ethereal.email',
    to: "fedejure@gmail.com",
    subject: `New message from ${name}`,
    text: `
      Name: ${name}
      Email: ${email}
      Phone: ${phone}
      Message: ${message}
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    console.log(info)
    if (error) {
      res.status(500).send("Error sending message");
    } else {
      res.status(200).send("Message sent successfully");
    }
  });
});

app.listen(3000, () => console.log("Server listening on port 3000"));
