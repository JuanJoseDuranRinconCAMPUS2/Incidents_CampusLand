import { con } from "../../db/atlas.js";
import errorcontroller from "../../middleware/errorsMongodb.js";
import { increment } from "../../db/autoincrement.js";
import { decrease } from "../../db/autoincrement.js";

let db= await con();
let collection = db.collection("Computers")

export const getComputersV100 = async ( req,res)=>{
    try {
        if(!req.rateLimit) return;
        let getResults = await collection.find({}).sort({ _id : 1}).toArray();
        res.send(getResults)
    } catch (error) {
        errorcontroller(error, res);
    }
}

export const postComputersV100 = async (req,res)=>{
    try{
        if(!req.rateLimit) return;
        const id =  await increment("Computers");
        let data = {_id: `CP-${id}`, ...req.body};
        let postResult = await collection.insertOne(data);
        res.status(200).send({status: 200, message: `Document with id CP-${id} has been created Successfully`});
    }catch(error){ 
        await decrease("Computers");
        errorcontroller(error, res);
    }
}

export const putComputersV100 = async (req,res)=>{
    let updates ={...req.body};
    let filter = parseInt(req.query.id, 10)
    try{
        if(!req.rateLimit) return;
        let updateResult = await collection.updateOne({_id: `CP-${filter}`},{$set: updates});
        if (updateResult.modifiedCount > 0) {
            res.status(200).send({status: 200, message: `Document with id CP-${filter} has been updated successfully`});
        } else {
            updateResult.matchedCount === 1
            ? res.status(200).send({ status: 200, message:`No changes made to the document with id CP-${filter}`})
            : res.status(404).send({ status: 404, message:`Document with id CP-${filter} was not found`});
        } 
    } catch (error) {
        errorcontroller(error, res)
    }
}

export const deleteComputersV100 = async (req,res)=>{
    try {
        if(!req.rateLimit) return;
        let id = req.body.id
        let deleteResult  = await collection.deleteOne({ _id: `CP-${id}`})
        deleteResult.deletedCount === 1
        ? res.status(200).send({ status: 200, message:`Document with id CP-${id} has been successfully deleted`})
        : res.status(404).send({ status: 404, message:`Document with id CP-${id} has not been found`});
    } catch (error) {
        errorcontroller(error, res)
    }
}