import  express from 'express';
import { con } from "../db/atlas.js";
import errorcontroller from "../middleware/errorsMongodb.js";

let db = await con();

const proxyCreateUser = express();
const proxyDeleteUser = express();

let User_Api = db.collection("User_Api");
let User = db.collection("User");

let validatorExistenceValues = async (name, value) => {
    const userApiResult = await User_Api.findOne({ [name]: value });
    const userResult = await User.findOne({ [name]: value });

    if (userApiResult || userResult) {
        return true;
    }
    return false;
}

let ErrorValidation = (res, mensaje) => {
     res.status(409).send(mensaje);
}

let versions_Api = [
    "1.0.0",
    "1.0.1",
    "1.0.2",
    "1.1.0",
    "1.2.0",
    "1.3.0",
    "1.4.0",
    "1.5.0",
    "1.6.0",
    "1.7.0",
]

proxyCreateUser.use(async(req, res, next)=>{
    try {
        const data = req.body;

        let validateName = await validatorExistenceValues("Name", data.Name);
        if (validateName) {
            let mensaje = {status: 409, message: `The user with the username: '${data.Name}', is already registered in the database.`};
            ErrorValidation(res, mensaje);
            return;
        }

        let validateEmail = await validatorExistenceValues("Email", data.Email);
        if (validateEmail) {
            let mensaje = {status: 409, message: `The user with the email: '${data.Email}', is already registered in the database.`};
            ErrorValidation(res, mensaje);
            return;
        }

        let validateIdentity = await validatorExistenceValues("Identity_card", data.Identity_card);
        if (validateIdentity) {
            let mensaje = {status: 409, message: `The user with the Identity_card: '${data.Identity_card}', is already registered in the database.`};
            ErrorValidation(res, mensaje);
            return;
        }

        let versions_User = data.Versions;

        versions_User.forEach(v1 => {
            const versionSelect = versions_Api.indexOf(v1);
            if (versionSelect < 0) {
                let mensaje = {status: 409, message: `The version: '${v1}', does not exist in the api, please try again.`};
                ErrorValidation(res, mensaje);
                return;
            }
        });
        next();
    } catch (error) {
      errorcontroller(error, res);
    }
});

proxyDeleteUser.use(async(req, res, next)=>{
    try {
        const data = req.body;

        let validateName = await validatorExistenceValues("Name", data.Name);
        if (!validateName) {
            let mensaje = {status: 409, message: `The user with the username: '${data.Name}', is not registered in the database.`};
            ErrorValidation(res, mensaje);
            return;
        }
        next();
    } catch (error) {
      errorcontroller(error, res);
    }
});
export {proxyCreateUser, proxyDeleteUser};