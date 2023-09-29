import { con } from "../../db/atlas.js";
import nodemailer from "nodemailer";
import { emailTemplateCode } from "../../models/emailTemplate.js";
import { transporter } from "../../controllers/emailControllers.js";
import { loadEnv } from 'vite'

const env = loadEnv("development", process.cwd(), 'NODEEMAIL');
let db= await con();
let PasswordCode = db.collection("PasswordCode");

function generateCode() {
    const charactersAllowed = '0123456789!@#$%^&*abcdefghijklmnopqrstuvwxyz?';
    const length = 5;
    let code = '';
  
    for (let i = 0; i < length; i++) {
      const indexRandom = Math.floor(Math.random() * charactersAllowed.length);
      code += charactersAllowed.charAt(indexRandom);
    }
  
    return code;
}

async function sendEmail(data){
    const info = await transporter.sendMail({
        from: `"🐰Campus Incidents🐰" <${env.NODEEMAIL_MAIL_NAME}>`, 
        to: `${data.Email}`, 
        subject: `Password Change Code: ${data.Name}✔`, 
        html: emailTemplateCode(data),
    });
    
    console.log("Message sent: %s", info.messageId);
}

export const sendRecoveryCodeV120 = async (req,res)=>{
    try{
        if(!req.rateLimit) return;
        let data= {...req.body, CreatedAt: new Date(), Recovery_Code: generateCode()};
        let update = await PasswordCode.findOne({Name : data.Name, Email : data.Email });

        sendEmail(data);

        (!update)
        ?   await PasswordCode.insertOne(data)
        :   await PasswordCode.updateOne({ Name : data.Name, Email : data.Email },{$set: { Recovery_Code : data.Recovery_Code}});

        res.status(200).send({status: 200, 
            message: `Recovery code created, check your inbox to find the email, if you can't find it, check your spam folder.`, 
            creation_date: data.CreatedAt, code: data.Recovery_Code, user: data.Name
        });
    } catch (error) {
        res.send(error);
    }
}