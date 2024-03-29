import {Router} from 'express'
import routesVersioning  from 'express-routes-versioning';
import { proxyComputers } from '../middleware/proxyPEndpoints.js';
import { proxyPValidateIds } from '../middleware/proxyIdsV.js';
import { getComputersV100, postComputersV100, putComputersV100, deleteComputersV100 } from '../versions/V1.0.0/computersv1.0.0.js';
import { totalComputersPerClassroomV101, totalComputersPerAreaV101, getComputerPerClassroomV101, getPeripheralsPerComputerV100 } from '../versions/V1.0.1/specialRComputers.js';
import { getLimit, postAndPutLimit , deleteLimit } from '../middleware/rateLimit.js';
import { proxyValidationTokens } from '../middleware/proxyValidationTokens.js';

const Computers = Router();
const version = routesVersioning();


Computers.get('/', getLimit(), proxyValidationTokens(["Admin" , "Camper" , "Trainer"]), version({
    "1.0.0": getComputersV100,
    "1.0.1": (req, res, next) => {
        proxyPValidateIds(req, res, (err) => {
            getComputerPerClassroomV101(req, res, next);
        });
    },
    "1.0.2": (req, res, next) => {
        proxyPValidateIds(req, res, (err) => {
            getPeripheralsPerComputerV100(req, res, next);
        });
    }
}));

Computers.get('/total-computers', getLimit(), proxyValidationTokens(["Admin" , "Camper" , "Trainer"]), proxyPValidateIds,  version({
    "1.0.0": totalComputersPerClassroomV101,
    "1.0.1": totalComputersPerAreaV101,
}));

Computers.post('/', postAndPutLimit(740), version({
    "1.0.0": postComputersV100,
    "1.0.1": (req, res, next) => {
        proxyComputers(req, res, (err) => {
            postComputersV100(req, res, next);
        });
    },
    "1.0.2": (req, res, next) => {
        proxyValidationTokens(["Admin", "Trainer"])(req, res, (err) => {
            proxyComputers(req, res, (err) => {
                postComputersV100(req, res, next);
            });
        });
    }
})); 

Computers.put('/', postAndPutLimit(740), proxyPValidateIds, version({
    "1.0.0": putComputersV100,
    "1.0.1": (req, res, next) => {
        proxyComputers(req, res, (err) => {
            putComputersV100(req, res, next);
        });
    },
    "1.0.2": (req, res, next) => {
        proxyValidationTokens(["Admin", "Trainer"])(req, res, (err) => {
            proxyComputers(req, res, (err) => {
                putComputersV100(req, res, next);
            });
        });
    }
})); 

Computers.delete('/', deleteLimit(), proxyValidationTokens(["Admin" , "Trainer"]), proxyPValidateIds, version({
    "1.0.0": deleteComputersV100
})); 

export default Computers;