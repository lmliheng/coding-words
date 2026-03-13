const nodemailer = require("nodemailer");

// Create a transporter using Ethereal test credentials.
// For production, replace with your actual SMTP server details.
const transporter = nodemailer.createTransport({
  host: "smtp.126.com",
  port: 465,
  secure: true, // Use true for port 465, false for port 587
  auth: {
    user: "liheng2137@126.com",
    pass: "TSiDAVDXpTD7rnMD",
  },

}

);

console.log('*****************************');
console.log('Nodemailer transporter 配置完成');
console.log('*****************************');


// Send an email using async/await

(async () => {
  const info = await transporter.sendMail({
    from: '"李恒" <liheng2137@126.com>',
    to: "liheng221994@qq.com",
    subject: "Hello ✔",
    text: "Hello world?", // Plain-text version of the message
    html: "<b>Hello world?</b>", // HTML version of the message
  });

  console.log("Message sent:", info.messageId);
})();



//npm init -y
//npm install nodemailer
// node mailer.js 发送邮件