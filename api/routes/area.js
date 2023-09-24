import {Router} from 'express'
import routesVersioning  from 'express-routes-versioning';
import { proxyArea } from '../middleware/proxyPEndpoints.js';
import { proxyPValidateIds } from '../middleware/proxyIdsV.js';
import { getAreaV100, postAreaV100, putAreaV100, deleteAreaV100 } from '../versions/V1.0.0/areav1.0.0.js';
import { getLimit, postAndPutLimit , deleteLimit } from '../middleware/rateLimit.js';

const Area = Router();
const version = routesVersioning();


Area.get('/', getLimit(), version({
    "1.0.0": getAreaV100
}));

Area.post('/', postAndPutLimit(250), version({
    "1.0.0": postAreaV100,
    "1.0.1": (req, res, next) => {
        proxyArea(req, res, (err) => {
            postAreaV100(req, res, next);
        });
    }
})); 

Area.put('/', postAndPutLimit(250), proxyPValidateIds, version({
    "1.0.0": putAreaV100,
    "1.0.1": (req, res, next) => {
        proxyArea(req, res, (err) => {
            putAreaV100(req, res, next);
        });
    }
})); 

Area.delete('/', deleteLimit(), proxyPValidateIds, version({
    "1.0.0": deleteAreaV100
})); 

export default Area;