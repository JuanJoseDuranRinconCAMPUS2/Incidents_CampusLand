import { Router } from "express";
import routesVersioning  from 'express-routes-versioning';
import { proxyLoginUser } from "../middleware/proxyPEndpoints.js";
import { proxyCredentialsUser } from "../middleware/proxyLoginUser.js";
import { LoginUserV110, getTokenPerIdUserV110 } from "../versions/V1.1.0/loginUserv1.0.0.js";
import { getLimit, postAndPutLimit , deleteLimit } from '../middleware/rateLimit.js';
import { proxyPValidateIds } from '../middleware/proxyIdsV.js';



const LoginUser = Router();
const version = routesVersioning();

LoginUser.post('/', postAndPutLimit(235), proxyLoginUser, proxyCredentialsUser, version({
    "1.1.0": LoginUserV110
}))

LoginUser.get('/UserToken', getLimit(), proxyPValidateIds, version({
    "1.0.0": getTokenPerIdUserV110
}));



export default LoginUser;