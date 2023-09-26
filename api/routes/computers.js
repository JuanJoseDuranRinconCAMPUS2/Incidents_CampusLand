import {Router} from 'express'
import routesVersioning  from 'express-routes-versioning';
import { proxyComputers } from '../middleware/proxyPEndpoints.js';
import { proxyPValidateIds } from '../middleware/proxyIdsV.js';
import { getComputersV100, postComputersV100, putComputersV100, deleteComputersV100 } from '../versions/V1.0.0/computersv1.0.0.js';
import { getLimit, postAndPutLimit , deleteLimit } from '../middleware/rateLimit.js';

const Computers = Router();
const version = routesVersioning();


Computers.get('/', getLimit(), version({
    "1.0.0": getComputersV100
}));

Computers.post('/', postAndPutLimit(740), version({
    "1.0.0": postComputersV100,
    "1.0.1": (req, res, next) => {
        proxyComputers(req, res, (err) => {
            postComputersV100(req, res, next);
        });
    }
})); 

Computers.put('/', postAndPutLimit(740), proxyPValidateIds, version({
    "1.0.0": putComputersV100,
    "1.0.1": (req, res, next) => {
        proxyComputers(req, res, (err) => {
            putComputersV100(req, res, next);
        });
    }
})); 

Computers.delete('/', deleteLimit(), proxyPValidateIds, version({
    "1.0.0": deleteComputersV100
})); 

export default Computers;