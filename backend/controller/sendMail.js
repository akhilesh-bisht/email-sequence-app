import nodemailer from "nodemailer";

export const sendMail = async (req, res) => {
  // SMTP Configuration
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  res.send("mail deliverd");
};
