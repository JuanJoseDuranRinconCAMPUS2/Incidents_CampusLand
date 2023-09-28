import { Router } from "express";
import routesVersioning  from 'express-routes-versioning';
import { proxyUserCreation, proxyUserDeletion } from "../middleware/proxyPEndpoints.js";
import { proxyCreateUser, proxyDeleteUser } from "../middleware/proxyCreateUser.js";
import { UserCreationv110, getUsersNotAuthorizedV110, deleteUserNotAuthorizedV110 } from "../versions/V1.1.0/userCreationv1.1.0.js";
import { getLimit, postAndPutLimit , deleteLimit } from '../middleware/rateLimit.js';
import { validatorIds } from "../controllers/vId.js";
import { proxyValidationTokens } from '../middleware/proxyValidationTokens.js';

const UserCreation = Router();
const version = routesVersioning();

UserCreation.get('/UsersNotAuthorized', getLimit(), proxyValidationTokens(["Admin" , "Trainer"]),  validatorIds, version({
    "1.1.0": getUsersNotAuthorizedV110
}))

UserCreation.post('/', postAndPutLimit(900), proxyUserCreation, proxyCreateUser, version({
    "1.1.0": UserCreationv110
}))

UserCreation.delete('/deleteUserNotAuthorized', postAndPutLimit(120), proxyValidationTokens(["Admin" , "Camper" , "Trainer"]), proxyUserDeletion, proxyDeleteUser, version({
    "1.1.0": deleteUserNotAuthorizedV110
}))


export default UserCreation;