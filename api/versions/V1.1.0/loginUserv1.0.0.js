import { con } from "../../db/atlas.js";
import { loadEnv } from 'vite'
import { SignJWT } from 'jose';

const env = loadEnv("development", process.cwd(), 'NODE');
let db= await con();

let Tokens_Api = db.collection("Tokens_Api");

export const LoginUserV110 = async (req, res) =>{
    if(!req.rateLimit) return;
    try {
        let data = req.body
        const encoder = new TextEncoder();
        const jwtconstructor = new SignJWT(Object.assign({}, data));
        const jwt = await jwtconstructor
        .setProtectedHeader({alg:"HS256", typ: "JWT"})
        .setIssuedAt()
        .setExpirationTime("2h")
        .sign(encoder.encode(env.NODE_JWT_PRIMATE_KEY));
        req.data = jwt;
     
        let update = await Tokens_Api.findOne({ Id_User : data.id_User });

        (!update)
        ?   await Tokens_Api.insertOne({ Id_User : data.id_User , Token : jwt })
        :   await Tokens_Api.findOneAndUpdate({ Id_User : data.id_User },{$set: { Token : jwt }}); 
        
        res.status(201).send({status: 201, message: jwt, instructions: "En el header de la peticion pon el header 'Authorization' y luego pon esta llave como valor"});
  } catch (error) {
    console.log(error);
      res.status(404).send({status: 404, message: "Error al crear el Token"});
  }

}