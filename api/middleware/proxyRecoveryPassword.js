import  express from 'express';
import { con } from "../db/atlas.js";
import errorcontroller from './errorsMongodb.js';

let db = await con();

const proxyValidateCodeUsers = express();

let PasswordCode = db.collection("PasswordCode");


let validatorExistenceUser = async (value) => {
    return await PasswordCode.findOne({Name : value });
}

let errorValidation = (res, message) => {
    res.status(409).send(message);
}

proxyValidateCodeUsers.use(async(req, res, next)=>{
    try {
        let data = req.body;

        let recoveryVal = await validatorExistenceUser(data.Name);
        if (!recoveryVal) {
            let message = {status: 409, message: `The user with the username: '${data.Name}', has not requested a password recovery.`};
            errorValidation(res, message);
            return;
        }
        if (recoveryVal.Email !== data.Email) {
            let message = {status: 409, message: `The email does not correspond to the user, please try again.`};
            errorValidation(res, message);
            return;
        }

        if (recoveryVal.Recovery_Code !== data.Recovery_Code) {
            let message = {status: 409, message: `Incorrect password recovery code, request another code and try again.`};
            errorValidation(res, message);
            return;
        }

        let deleteRecoveryCode = await PasswordCode.deleteOne({ Name : data.Name})
        next();
    } catch (error) {
      errorcontroller(error, res);
    }
});

export {proxyValidateCodeUsers}