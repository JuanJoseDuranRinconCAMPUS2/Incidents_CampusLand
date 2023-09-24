import {Router} from 'express'
import routesVersioning  from 'express-routes-versioning';
import { proxyClassroom } from '../middleware/proxyPEndpoints.js';
import { proxyPValidateIds } from '../middleware/proxyIdsV.js';
import { getClassroomV100, postClassroomV100, putClassroomV100, deleteClassroomV100 } from '../versions/V1.0.0/classroomv1.0.0.js';
import { getLimit, postAndPutLimit , deleteLimit } from '../middleware/rateLimit.js';

const Classroom = Router();
const version = routesVersioning();


Classroom.get('/', getLimit(), version({
    "1.0.0": getClassroomV100
}));

Classroom.post('/', postAndPutLimit(700), version({
    "1.0.0": postClassroomV100,
    "1.0.1": (req, res, next) => {
        proxyClassroom(req, res, (err) => {
            postClassroomV100(req, res, next);
        });
    }
})); 

Classroom.put('/', postAndPutLimit(700), proxyPValidateIds, version({
    "1.0.0": putClassroomV100,
    "1.0.1": (req, res, next) => {
        proxyClassroom(req, res, (err) => {
            putClassroomV100(req, res, next);
        });
    }
})); 

Classroom.delete('/', deleteLimit(), proxyPValidateIds, version({
    "1.0.0": deleteClassroomV100
})); 

export default Classroom;