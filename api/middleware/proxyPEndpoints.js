import  express from 'express';
import { validationResult } from 'express-validator';
import { vArea } from '../controllers/vArea.js';


const proxyArea= express();

//proxy usado para validar los metodos datos de entrada de los metodos put y post en alimentos

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

export {
    proxyArea
}