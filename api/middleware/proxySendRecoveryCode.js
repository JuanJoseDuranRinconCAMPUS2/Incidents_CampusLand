import  express from 'express';
import { con } from "../db/atlas.js";
import errorcontroller from './errorsMongodb.js';

let db = await con();

const proxyUsersValidate = express();

let User_Api = db.collection("User_Api");

let validatorExistenceUser = async (value) => {
    return await User_Api.findOne({Name : value });
}

let errorValidation = (res, message) => {
    res.status(409).send(message);
}

proxyUsersValidate.use(async(req, res, next)=>{
    try {
        let data = req.body;

        let validateName = await validatorExistenceUser(data.Name);
        if (!validateName) {
            let message = {status: 409, message: `The user with the username: '${data.Name}', is not registered in the database.`};
            errorValidation(res, message);
            return;
        }
        if (validateName.Email !== data.Email) {
            let message = {status: 409, message: `The email does not correspond to the user, please try again.`};
            errorValidation(res, message);
            return;
        }
        next();
    } catch (error) {
        console.log(error);
      errorcontroller(error, res);
    }
});

export {proxyUsersValidate}