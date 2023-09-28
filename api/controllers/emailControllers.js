import nodemailer from "nodemailer";
import { loadEnv } from 'vite'

const env = loadEnv("development", process.cwd(), 'NODEEMAIL');

export const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: `${env.NODEEMAIL_MAIL_NAME}`,
      pass: `${env.NODEEMAIL_MAIL_PASSWORD}`     
    }
});