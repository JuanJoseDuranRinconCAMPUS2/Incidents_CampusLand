import { con } from "../../db/atlas.js";
import errorcontroller from "../../middleware/errorsMongodb.js";
import { increment } from "../../db/autoincrement.js";
import { decrease } from "../../db/autoincrement.js";

let db= await con();
let collection = db.collection("Classroom")

export const getClassroomV100 = async ( req,res)=>{
    try {
        if(!req.rateLimit) return;
        let getResults = await collection.find({}).sort({ _id : 1}).toArray();
        res.send(getResults)
    } catch (error) {
        errorcontroller(error, res);
    }
}

export const postClassroomV100 = async (req,res)=>{
    try{
        if(!req.rateLimit) return;
        const id =  await increment("Classroom");
        let data = {_id: id, ...req.body};
        let postResult = await collection.insertOne(data);
        res.status(200).send({status: 200, message: `Document with id ${id} has been created Successfully`});
    }catch(error){ 
        await decrease("Classroom");
        errorcontroller(error, res);
    }
}

export const putClassroomV100 = async (req,res)=>{
    let updates ={...req.body};
    let filter = parseInt(req.query.id, 10)
    try{
        if(!req.rateLimit) return;
        let updateResult  = await collection.updateOne({_id: filter},{$set: updates});
        if (updateResult .modifiedCount > 0) {
            res.status(200).send({status: 200, message: `Document with id ${filter} has been updated successfully`});
        } else {
            updateResult.matchedCount === 1
            ? res.status(200).send({ status: 200, message:`No changes made to the document with id ${filter}`})
            : res.status(404).send({ status: 404, message:`Document with id ${filter} was not found`});
        } 
    } catch (error) {
        errorcontroller(error, res)
    }
}

export const deleteClassroomV100 = async (req,res)=>{
    try {
        if(!req.rateLimit) return;
        let id = req.body.id
        let deleteResult  = await collection.deleteOne({"_id":id})
        deleteResult.deletedCount === 1
        ? res.status(200).send({ status: 200, message:`Document with id ${id} has been successfully deleted`})
        : res.status(404).send({ status: 404, message:`Document with id ${id} has not been found`});
    } catch (error) {
        errorcontroller(error, res)
    }
}