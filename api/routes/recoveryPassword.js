import { Router } from "express";
import routesVersioning  from 'express-routes-versioning';
import { postAndPutLimit } from "../middleware/rateLimit.js";
import { updatePassword } from "../versions/V1.2.0/recoveryPasswordv1.2.0.js";
import { proxyValidateCodeUsers } from "../middleware/proxyRecoveryPassword.js";
import { proxyRecoveryPassword } from "../middleware/proxyPEndpoints.js";


const RecoveryPassword = Router();
const version = routesVersioning();

RecoveryPassword.post('/', postAndPutLimit(300), proxyRecoveryPassword, proxyValidateCodeUsers, version({
    "1.1.0": updatePassword
}))


export default RecoveryPassword;