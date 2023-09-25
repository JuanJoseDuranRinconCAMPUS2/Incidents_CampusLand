import {Router} from 'express'
import routesVersioning  from 'express-routes-versioning';
import { proxyDocument_type } from '../middleware/proxyPEndpoints.js';
import { proxyPValidateIds } from '../middleware/proxyIdsV.js';
import { getDocument_typeV100, postDocument_typeV100, putDocument_typeV100, deleteDocument_typeV100 } from '../versions/V1.0.0/document_typev1.0.0.js';
import { getLimit, postAndPutLimit , deleteLimit } from '../middleware/rateLimit.js';

const Document_type = Router();
const version = routesVersioning();


Document_type.get('/', getLimit(), version({
    "1.0.0": getDocument_typeV100
}));

Document_type.post('/', postAndPutLimit(250), version({
    "1.0.0": postDocument_typeV100,
    "1.0.1": (req, res, next) => {
        proxyDocument_type(req, res, (err) => {
            postDocument_typeV100(req, res, next);
        });
    }
})); 

Document_type.put('/', postAndPutLimit(250), proxyPValidateIds, version({
    "1.0.0": putDocument_typeV100,
    "1.0.1": (req, res, next) => {
        proxyDocument_type(req, res, (err) => {
            putDocument_typeV100(req, res, next);
        });
    }
})); 

Document_type.delete('/', deleteLimit(), proxyPValidateIds, version({
    "1.0.0": deleteDocument_typeV100
})); 

export default Document_type;