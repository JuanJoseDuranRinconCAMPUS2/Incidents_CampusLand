import { Router } from "express";
import routesVersioning  from 'express-routes-versioning';
import { postAndPutLimit } from "../middleware/rateLimit.js";
import { proxyUsersValidate } from "../middleware/proxySendRecoveryCode.js";
import { proxySendRecoveryCode } from "../middleware/proxyPEndpoints.js";
import { sendRecoveryCodeV120 } from "../versions/V1.2.0/sendRecoveryCodev.1.2.0.js";

const SendRecoveryCode = Router();
const version = routesVersioning();

SendRecoveryCode.post('/', postAndPutLimit(235), proxySendRecoveryCode, proxyUsersValidate, version({
    "1.2.0": sendRecoveryCodeV120
}))


export default SendRecoveryCode;