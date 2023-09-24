import  express from 'express';
import { validationResult } from 'express-validator';
import { vArea } from '../controllers/vArea.js';
import { vClassroom } from '../controllers/vClassroom.js';
import { vCategory_Inc } from '../controllers/vCategory_Inc.js';

//proxy used to validate the input data methods put and post methods

const proxyV = (validationRule, mapping) => async (req, res, next) => {

    await Promise.all(validationRule.map(field => field.run(req)));

    const error = validationResult(req);
    if(!error.isEmpty()) return res.status(400).json(error)

    const mappedData = {};
    for (const [key, value] of Object.entries(mapping)) {
        mappedData[value] = req.body[key];
    }
        
    req.body = mappedData;
    next();
};


const proxyArea= express();
const proxyClassroom = express();
const proxyCategory_Inc = express();

// Define the mappings

const areaMapping = {
    name_Area: 'A_Name',
    description_Area: 'A_Description'
};

const classroomMapping = {
    name_Classroom: 'Sln_Name',
    description_Classroom: 'Sln_Description',
    classroom_Area: 'Sln_Areas'
};

const category_IncMapping = {
    name_Category_Inc: 'Cat_Name',
    description_Category_Inc: 'Cat_Description'
};

proxyArea.use(proxyV(vArea, areaMapping));
proxyClassroom.use(proxyV(vClassroom, classroomMapping));
proxyCategory_Inc.use(proxyV(vCategory_Inc, category_IncMapping));

export {
    proxyArea,
    proxyClassroom,
    proxyCategory_Inc
}