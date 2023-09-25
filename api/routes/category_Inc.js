import {Router} from 'express'
import routesVersioning  from 'express-routes-versioning';
import { proxyCategory_Inc } from '../middleware/proxyPEndpoints.js';
import { proxyPValidateIds } from '../middleware/proxyIdsV.js';
import { getCategory_IncV100, postCategory_IncV100, putCategory_IncV100, deleteCategory_IncV100 } from '../versions/V1.0.0/Category_Incv1.0.0.js';
import { getLimit, postAndPutLimit , deleteLimit } from '../middleware/rateLimit.js';

const Category_Inc = Router();
const version = routesVersioning();


Category_Inc.get('/', getLimit(), version({
    "1.0.0": getCategory_IncV100
}));

Category_Inc.post('/', postAndPutLimit(750), version({
    "1.0.0": postCategory_IncV100,
    "1.0.1": (req, res, next) => {
        proxyCategory_Inc(req, res, (err) => {
            postCategory_IncV100(req, res, next);
        });
    }
})); 

Category_Inc.put('/', postAndPutLimit(750), proxyPValidateIds, version({
    "1.0.0": putCategory_IncV100,
    "1.0.1": (req, res, next) => {
        proxyCategory_Inc(req, res, (err) => {
            putCategory_IncV100(req, res, next);
        });
    }
})); 

Category_Inc.delete('/', deleteLimit(), proxyPValidateIds, version({
    "1.0.0": deleteCategory_IncV100
})); 

export default Category_Inc;