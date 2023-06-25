import nodemailer from "nodemailer";

const sendEmail = async (someParams) => {
  // 1) cretae a transporter

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // 2) define the email options
  const emailOptions = {
    from: process.env.EMAIL_USER,
    to: someParams.email,
    subject: someParams.subject,
    text: someParams.message,
    //html
  };

  // 3) send mail
  await transporter.sendMail(emailOptions);
};

export default sendEmail;
