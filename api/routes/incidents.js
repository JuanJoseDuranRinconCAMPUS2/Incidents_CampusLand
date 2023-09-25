import {Router} from 'express'
import routesVersioning  from 'express-routes-versioning';
import { proxyIncidents } from '../middleware/proxyPEndpoints.js';
import { proxyPValidateIds } from '../middleware/proxyIdsV.js';
import { getIncidentsV100, postIncidentsV100, putIncidentsV100, deleteIncidentsV100 } from '../versions/V1.0.0/incidentsv1.0.0.js';
import { getLimit, postAndPutLimit , deleteLimit } from '../middleware/rateLimit.js';

const Incidents = Router();
const version = routesVersioning();


Incidents.get('/', getLimit(), version({
    "1.0.0": getIncidentsV100
}));

Incidents.post('/', postAndPutLimit(2600), version({
    "1.0.0": postIncidentsV100,
    "1.0.1": (req, res, next) => {
        proxyIncidents(req, res, (err) => {
            postIncidentsV100(req, res, next);
        });
    }
})); 

Incidents.put('/', postAndPutLimit(2600), proxyPValidateIds, version({
    "1.0.0": putIncidentsV100,
    "1.0.1": (req, res, next) => {
        proxyIncidents(req, res, (err) => {
            putIncidentsV100(req, res, next);
        });
    }
})); 

Incidents.delete('/', deleteLimit(), proxyPValidateIds, version({
    "1.0.0": deleteIncidentsV100
})); 

export default Incidents;