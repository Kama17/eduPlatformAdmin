import nodemailer from 'nodemailer'


interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: EmailOptions) {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "kamilwilk.box@gmail.com",
      pass: "gjqebejqdrpxruqg",
    },
  });

  await transporter.sendMail({
    from: 'kamilwilk.box@gmail.com',
    to,
    subject,
    html,
  });
}
