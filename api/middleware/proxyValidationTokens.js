import  express from 'express';
import { loadEnv } from 'vite'
import { SignJWT, jwtVerify } from 'jose';


const env = loadEnv("development", process.cwd(), 'NODE');

function roleValidation(rolesAllowed , rolesUser) {
    
    for (const rol of rolesAllowed) {
      if (rolesUser.includes(rol)) {
        return true;
      }
    }
    
    return false;
  }
  
export function proxyValidationTokens(rolesAllowed) {

    const proxyValidationTokens = express();

    proxyValidationTokens.use(async(req, res, next)=>{
        const {authorization} = req.headers;
        if (!authorization) return res.status(400).send({status: 400, message: "Token not sent"});
        try {
            const encoder = new TextEncoder();
            const jwtData = await jwtVerify(
                authorization,
                encoder.encode(env.NODE_JWT_PRIMATE_KEY)
            );
            req.dataUser = jwtData;
            next();
        } catch (error) {
            switch (error.code) {
                case "ERR_JWT_EXPIRED":
                        res.status(498).send({status: 498, message: "Expired token"});
                    break;

                case "ERR_JWS_INVALID":
                        res.status(498).send({status: 498, message: "Invalid token"});
                    break;
            
                default:
                        res.status(498).send({status: 498, message: "Error validating token"});
                    break;
            }
        }
    });
    proxyValidationTokens.use(async(req, res, next)=>{
        try {
            if(!req.rateLimit) return; 
            let {payload} = req.dataUser;
            const { iat, exp, ...newPayload } = payload;
            let dataUser = newPayload;
            let dataValidator = { ...newPayload}
            
            let userVersions = dataUser.Versions;
            const versionSelect = userVersions.indexOf(req.headers['accept-version']);
        
            if (versionSelect < 0) {
                let mensaje = {status: 406, message: `You do not have access to this version of the api, please try again.`};
                return res.status(406).send(mensaje);
            }
            
            let userRoles = dataUser.Code_Rol;

            const rolVal = roleValidation(rolesAllowed , userRoles);

            if (!rolVal) {
                let mensaje = {status: 406, message: `You do not have the required role to access this function, please try again.`};
                return res.status(406).send(mensaje);
            }

            if (dataUser.Authorization == false) {
                let mensaje = {status: 406, message: `Only authorized users can access the site, wait for a trainer or admin to authorize you.`};
                return res.status(406).send(mensaje);
            }

            let Verify = JSON.stringify(dataUser) === JSON.stringify(dataValidator);
            (!Verify) ? res.status(406).send({status: 406, message: "You are not authorized to access this function."}) : next(); 
        } catch (err) {
            res.status(err.status).send(err);
        }
    });

    return proxyValidationTokens;
}
