import {Router} from 'express'
import routesVersioning  from 'express-routes-versioning';
import { proxyUser } from '../middleware/proxyPEndpoints.js';
import { proxyPValidateIds } from '../middleware/proxyIdsV.js';
import { getUserV100, postUserV100, putUserV100, deleteUserV100 } from '../versions/V1.0.0/userv1.0.0.js';
import { getLimit, postAndPutLimit , deleteLimit } from '../middleware/rateLimit.js';

const User = Router();
const version = routesVersioning();


User.get('/', getLimit(), version({
    "1.0.0": getUserV100
}));

User.post('/', postAndPutLimit(740), version({
    "1.0.0": postUserV100,
    "1.0.1": (req, res, next) => {
        proxyUser(req, res, (err) => {
            postUserV100(req, res, next);
        });
    }
})); 

User.put('/', postAndPutLimit(740), proxyPValidateIds, version({
    "1.0.0": putUserV100,
    "1.0.1": (req, res, next) => {
        proxyUser(req, res, (err) => {
            putUserV100(req, res, next);
        });
    }
})); 

User.delete('/', deleteLimit(), proxyPValidateIds, version({
    "1.0.0": deleteUserV100
})); 

export default User;