import  express from 'express';
import { validationResult } from 'express-validator';
import { vArea } from '../controllers/vArea.js';
import { vClassroom } from '../controllers/vClassroom.js';
import { vCategory_Inc } from '../controllers/vCategory_Inc.js';
import { vType_Inc } from '../controllers/vType_Inc.js';
import { vDocument_type } from '../controllers/vDocument_type.js';
import { vGender } from '../controllers/vGender.js';
import { vComp_Status } from '../controllers/vComp_Status.js';

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
const proxyType_Inc = express();
const proxyDocument_type = express();
const proxyGender = express();
const proxyComp_Status = express();

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

const type_IncMapping = {
    name_Type_Inc: 'Typ_Name',
    description_Type_Inc: 'Typ_Description'
};

const document_typeMapping = {
    name_Document: 'Doc_Name',
    abbreviation_Document: 'Doc_Abbreviation'
};

const genderMapping = {
    name_Gender: 'Gen_Name',
    abbreviation_Gender: 'Gen_Abbreviation'
};

const comp_StatusMapping = {
    name_Status: 'Est_Name',
    description_Status: 'Est_Description'
};

proxyArea.use(proxyV(vArea, areaMapping));
proxyClassroom.use(proxyV(vClassroom, classroomMapping));
proxyCategory_Inc.use(proxyV(vCategory_Inc, category_IncMapping));
proxyType_Inc.use(proxyV(vType_Inc, type_IncMapping));
proxyDocument_type.use(proxyV(vDocument_type, document_typeMapping));
proxyGender.use(proxyV(vGender, genderMapping));
proxyComp_Status.use(proxyV(vComp_Status, comp_StatusMapping));

export {
    proxyArea,
    proxyClassroom,
    proxyCategory_Inc,
    proxyType_Inc,
    proxyDocument_type,
    proxyGender,
    proxyComp_Status
}