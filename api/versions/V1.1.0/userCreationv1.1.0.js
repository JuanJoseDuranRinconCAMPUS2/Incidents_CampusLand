import { con } from "../../db/atlas.js";
import errorcontroller from "../../middleware/errorsMongodb.js";
import { transporter } from "../../controllers/emailControllers.js";
import { increment } from "../../db/autoincrement.js";
import { decrease } from "../../db/autoincrement.js";
import { loadEnv } from 'vite'

import { emailCreationUser } from "../../models/emailTemplate.js";
import { emailValidationUser } from "../../models/emailTemplate.js";

const env = loadEnv("development", process.cwd(), 'NODEEMAIL');
let db= await con();
let User_Api = db.collection("User_Api");
let User = db.collection("User");
let Roles_Api = db.collection("Roles_Api");

let rolesText = ""

async function sendEmail(data, subject, content){
    const info = await transporter.sendMail({
        from: `"🐰Campus Incidents🐰" <${env.NODEEMAIL_MAIL_NAME}>`, 
        to: `${data.Email}`, 
        subject: `${subject}: ${data.Name}✔`, 
        html: content,
    });
    
    console.log("Message sent: %s", info.messageId);
}


export const getUsersNotAuthorizedV110 = async ( req,res)=>{
    try {
        if(!req.rateLimit) return;
        let getUsers = await User_Api.find({ Authorization: false }).sort({ _id : 1}).toArray();
        const promises = getUsers.map(async (person) => {
            let rolUser = []; 
            let rols = person.Code_Rol
            for (const rolId of rols) {
                const rolName = await Roles_Api.findOne({ _id: rolId });
                rolUser.push(rolName.rol);
            }
            person.Code_Rol = rolUser;
        });
        await Promise.all(promises);
        res.send(getUsers)
    } catch (error) {
        console.log(error);
        errorcontroller(error, res);
    }
}

export const UserCreationv110 = async (req, res) =>{
    try {
        if(!req.rateLimit) return;
        const id =  await increment("User");
        let { Versions, ...dataUser } = req.body;
        let roles = dataUser.Rol;
        dataUser = {_id : id , ...dataUser};
        const dataUserApi = {
            Name: dataUser.Name,
            Email: dataUser.Email,
            Password: dataUser.Password,
            Versions: Versions,
            Code_Rol: dataUser.Rol,
            Authorization: false
        };
        let resultUserApi = await User_Api.insertOne(dataUserApi);
        let resultUser = await User.insertOne(dataUser);
        const promises = roles.map(async (rol) => {
            const rolName = await Roles_Api.findOne({ _id: rol });
            rolesText += `[${rolName.rol}] `;
        });
        await Promise.all(promises);
        
        sendEmail(dataUserApi, "User creation", emailCreationUser(dataUserApi))

        res.status(200).send({status: 200, message: `The user: '${dataUser.Name}', with the roles of: '${rolesText}', has been successfully created.`});
    } catch (error) {
        await decrease("User");
        errorcontroller(error, res);
    }
}

export const deleteUserNotAuthorizedV110 = async (req,res)=>{
    try {
        if(!req.rateLimit) return;
        let Name = req.body.Name
        let deleteUserApi  = await User_Api.deleteOne({ Name : Name});
        let deleteUser = await User.deleteOne({ Name : Name});
        res.status(200).send({ status: 200, message:`The user: ${Name} has been successfully deleted`});
    } catch (error) {
        errorcontroller(error, res)
    }
}

export const authorizeUsersV110 = async (req,res)=>{
    try {
        if(!req.rateLimit) return;
        let Name = req.body.Name
        const validStatus = await User_Api.findOneAndUpdate({ Name: Name }, {$set: { Authorization : true}});
        res.status(200).send({ status: 200, message:`The user: ${Name} has been authorized `});
        sendEmail(validStatus, "User allowed", emailValidationUser(validStatus));
    } catch (error) {
        errorcontroller(error, res)
    }
}