import  express from 'express';
import { con } from "../db/atlas.js";
import errorcontroller from "../middleware/errorsMongodb.js";

let db = await con();

const proxyCredentialsUser = express();

let User_Api = db.collection("User_Api");
let User = db.collection("User");
let Roles_Api = db.collection("Roles_Api");

let validatorExistenceValues = async (name, value) => {
    const userApiResult = await User_Api.findOne({ [name]: value });
    const userResult = await User.findOne({ [name]: value });

    if (userApiResult || userResult) {
        return { Password : userResult.Password , _id : userResult._id, Versions : userApiResult.Versions, Authorization : userApiResult.Authorization, Code_Rol : userApiResult.Code_Rol};
    }
    return false;
}

let ErrorValidation = (res, message) => {
     res.status(409).send(message);
}

proxyCredentialsUser.use(async(req, res, next)=>{
    try {
        const data = req.body;

        let validateName = await validatorExistenceValues("Name", data.Name);
        if (!validateName) {
            let message = {status: 409, message: `The user with the username: '${data.Name}', is not registered in the database.`};
            ErrorValidation(res, message);
            return;
        }

        if (validateName.Password !== data.Password) {
            let message = {status: 409, message: `Incorrect password, try again.`};
            ErrorValidation(res, message);
            return;
        }

        let rolUser = []; 
        let rols = validateName.Code_Rol
        for (const rolId of rols) {
            const rolName = await Roles_Api.findOne({ _id: rolId });
            rolUser.push(rolName.rol);
        }
        
        req.body.id_User = validateName._id
        req.body.Versions = validateName.Versions
        req.body.Authorization = validateName.Authorization
        req.body.Code_Rol = rolUser
        
        next();
    } catch (error) {
      errorcontroller(error, res);
    }
});

export {proxyCredentialsUser};