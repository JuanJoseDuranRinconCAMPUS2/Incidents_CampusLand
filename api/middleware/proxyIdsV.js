import  express from 'express';
import { validationResult } from 'express-validator';
import { validatorIds } from '../controllers/vId.js';

const proxyPValidateIds = express();

//proxy used to validate input data for put and delete methods on endpoints

proxyPValidateIds.use(validatorIds, async(req, res, next)=>{
    try {
        const error = validationResult(req);
        if(!error.isEmpty()) return res.status(400).json(error)
        next();
    } catch (err) {
        res.status(404).send(err);
    }
});

export {
    proxyPValidateIds
}