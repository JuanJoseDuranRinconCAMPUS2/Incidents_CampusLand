import {Router} from 'express'
import routesVersioning  from 'express-routes-versioning';
import { proxyGender } from '../middleware/proxyPEndpoints.js';
import { proxyPValidateIds } from '../middleware/proxyIdsV.js';
import { getGenderV100, postGenderV100, putGenderV100, deleteGenderV100 } from '../versions/V1.0.0/genderv1.0.0.js';
import { getLimit, postAndPutLimit , deleteLimit } from '../middleware/rateLimit.js';
import { proxyValidationTokens } from '../middleware/proxyValidationTokens.js';

const Gender = Router();
const version = routesVersioning();


Gender.get('/', getLimit(), proxyValidationTokens(["Admin" , "Camper" , "Trainer"]), version({
    "1.0.0": getGenderV100
}));

Gender.post('/', postAndPutLimit(250), version({
    "1.0.0": postGenderV100,
    "1.0.1": (req, res, next) => {
        proxyGender(req, res, (err) => {
            postGenderV100(req, res, next);
        });
    },
    "1.0.2": (req, res, next) => {
        proxyValidationTokens(["Admin", "Trainer"])(req, res, (err) => {
            proxyGender(req, res, (err) => {
                postGenderV100(req, res, next);
            });
        });
    }
})); 

Gender.put('/', postAndPutLimit(250), proxyPValidateIds, version({
    "1.0.0": putGenderV100,
    "1.0.1": (req, res, next) => {
        proxyGender(req, res, (err) => {
            putGenderV100(req, res, next);
        });
    },
    "1.0.2": (req, res, next) => {
        proxyValidationTokens(["Admin", "Trainer"])(req, res, (err) => {
            proxyGender(req, res, (err) => {
                putGenderV100(req, res, next);
            });
        });
    }
})); 

Gender.delete('/', deleteLimit(), proxyValidationTokens(["Admin", "Trainer"]), proxyPValidateIds, version({
    "1.0.0": deleteGenderV100
})); 

export default Gender;