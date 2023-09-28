import {Router} from 'express'
import routesVersioning  from 'express-routes-versioning';
import { proxyComp_Status } from '../middleware/proxyPEndpoints.js';
import { proxyPValidateIds } from '../middleware/proxyIdsV.js';
import { getComp_StatusV100, postComp_StatusV100, putComp_StatusV100, deleteComp_StatusV100 } from '../versions/V1.0.0/comp_Statusv1.0.0.js';
import { getLimit, postAndPutLimit , deleteLimit } from '../middleware/rateLimit.js';
import { proxyValidationTokens } from '../middleware/proxyValidationTokens.js';

const Comp_Status = Router();
const version = routesVersioning();


Comp_Status.get('/', getLimit(), proxyValidationTokens(["Admin" , "Camper" , "Trainer"]),  version({
    "1.0.0": getComp_StatusV100
}));

Comp_Status.post('/', postAndPutLimit(740), version({
    "1.0.0": postComp_StatusV100,
    "1.0.1": (req, res, next) => {
        proxyComp_Status(req, res, (err) => {
            postComp_StatusV100(req, res, next);
        });
    },
    "1.0.2": (req, res, next) => {
        proxyValidationTokens(["Admin", "Trainer"])(req, res, (err) => {
            proxyComp_Status(req, res, (err) => {
                postComp_StatusV100(req, res, next);
            });
        });
    }
})); 

Comp_Status.put('/', postAndPutLimit(740), proxyPValidateIds, version({
    "1.0.0": putComp_StatusV100,
    "1.0.1": (req, res, next) => {
        proxyComp_Status(req, res, (err) => {
            putComp_StatusV100(req, res, next);
        });
    },
    "1.0.2": (req, res, next) => {
        proxyValidationTokens(["Admin", "Trainer"])(req, res, (err) => {
            proxyComp_Status(req, res, (err) => {
                putComp_StatusV100(req, res, next);
            });
        });
    }
})); 

Comp_Status.delete('/', deleteLimit(), proxyValidationTokens(["Admin", "Trainer"]), proxyPValidateIds, version({
    "1.0.0": deleteComp_StatusV100
})); 

export default Comp_Status;