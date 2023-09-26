import {Router} from 'express'
import routesVersioning  from 'express-routes-versioning';
import { proxyIncidents , proxyIncidentsPerDate } from '../middleware/proxyPEndpoints.js';
import { proxyPValidateIds } from '../middleware/proxyIdsV.js';
import { getIncidentsV100, postIncidentsV100, putIncidentsV100, deleteIncidentsV100 } from '../versions/V1.0.0/incidentsv1.0.0.js';
import { 
    totalIncidentsPerClassroomV101, totalIncidentsPerAreaV101,  totalIncidentsV101 ,getIncidentsPerUserV101, getIncidentsPerAreaV101,
    getIncidentsPerClassroomV101, getIncidentsPerPriorityV101, getIncidentsPerTypeV101, getIncidentsIDV101, getIncidentsPerDateV101, getIncidentsPerPCV101 } from '../versions/V1.0.1/specialRIncidents.js';
import { getLimit, postAndPutLimit , deleteLimit } from '../middleware/rateLimit.js';

const Incidents = Router();
const version = routesVersioning();


Incidents.get('/', getLimit(), version({
    "1.0.0": getIncidentsV100,
    "1.0.1": (req, res, next) => {
        proxyPValidateIds(req, res, (err) => {
            getIncidentsIDV101(req, res, next);
        });
    },
    "1.1.0": (req, res, next) => {
        proxyPValidateIds(req, res, (err) => {
            getIncidentsPerUserV101(req, res, next);
        });
    },
    "1.2.0": (req, res, next) => {
        proxyPValidateIds(req, res, (err) => {
            getIncidentsPerAreaV101(req, res, next);
        });
    },
    "1.3.0": (req, res, next) => {
        proxyPValidateIds(req, res, (err) => {
            getIncidentsPerClassroomV101(req, res, next);
        });
    },
    "1.4.0": (req, res, next) => {
        proxyPValidateIds(req, res, (err) => {
            getIncidentsPerPriorityV101(req, res, next);
        });
    },
    "1.5.0": (req, res, next) => {
        proxyPValidateIds(req, res, (err) => {
            getIncidentsPerTypeV101(req, res, next);
        });
    },
    "1.6.0": (req, res, next) => {
        proxyPValidateIds(req, res, (err) => {
            getIncidentsPerPCV101(req, res, next);
        });
    }
    
}));

Incidents.get('/total-incidents', getLimit(), version({
    "1.0.0": totalIncidentsV101,
    "1.1.0": totalIncidentsPerClassroomV101,
    "1.2.0": totalIncidentsPerAreaV101
}));

Incidents.get('/incidents-date', postAndPutLimit(260), version({
    "1.0.0": (req, res, next) => {
        proxyIncidentsPerDate(req, res, (err) => {
            getIncidentsPerDateV101(req, res, next);
        });
    }
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