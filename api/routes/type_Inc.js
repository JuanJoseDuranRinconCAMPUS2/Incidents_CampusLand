import {Router} from 'express'
import routesVersioning  from 'express-routes-versioning';
import { proxyType_Inc } from '../middleware/proxyPEndpoints.js';
import { proxyPValidateIds } from '../middleware/proxyIdsV.js';
import { getType_IncV100, postType_IncV100, putType_IncV100, deleteType_IncV100 } from '../versions/V1.0.0/type_Incv1.0.0.js';
import { getLimit, postAndPutLimit , deleteLimit } from '../middleware/rateLimit.js';

const Type_Inc = Router();
const version = routesVersioning();


Type_Inc.get('/', getLimit(), version({
    "1.0.0": getType_IncV100
}));

Type_Inc.post('/', postAndPutLimit(760), version({
    "1.0.0": postType_IncV100,
    "1.0.1": (req, res, next) => {
        proxyType_Inc(req, res, (err) => {
            postType_IncV100(req, res, next);
        });
    }
})); 

Type_Inc.put('/', postAndPutLimit(760), proxyPValidateIds, version({
    "1.0.0": putType_IncV100,
    "1.0.1": (req, res, next) => {
        proxyType_Inc(req, res, (err) => {
            putType_IncV100(req, res, next);
        });
    }
})); 

Type_Inc.delete('/', deleteLimit(), proxyPValidateIds, version({
    "1.0.0": deleteType_IncV100
})); 

export default Type_Inc;