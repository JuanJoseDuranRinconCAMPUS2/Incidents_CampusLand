import  express from 'express';
import { validationResult } from 'express-validator';
import { vArea } from '../controllers/vArea.js';
import { vClassroom } from '../controllers/vClassroom.js';

const proxyArea= express();
const proxyClassroom = express();

//proxy used to validate the input data methods put and post methods in Area
proxyArea.use(vArea, async(req, res, next)=>{
    try {
        const error = validationResult(req);
        if(!error.isEmpty()) return res.status(400).json(error)
        let { 
            name_Area:A_Name, description_Area:A_Description
        } = req.body
        req.body = {
            A_Name, A_Description
        }
        next();
    } catch (err) {
        res.status(err.status).send(err);
    }
});

//proxy used to validate the input data methods put and post methods in Area
proxyClassroom.use(vClassroom, async(req, res, next)=>{
    try {
        const error = validationResult(req);
        if(!error.isEmpty()) return res.status(400).json(error)
        let { 
            name_Classroom:Sln_Name, description_Classroom:Sln_Description, classroom_Area: Sln_Areas
        } = req.body 
        req.body = {
            Sln_Name, Sln_Description, Sln_Areas
        }
        next();
    } catch (err) {
        res.status(err.status).send(err);
    }
});

export {
    proxyArea,
    proxyClassroom
}