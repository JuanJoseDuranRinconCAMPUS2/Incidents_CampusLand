import { con } from "../../db/atlas.js";
import errorcontroller from "../../middleware/errorsMongodb.js";
import { increment } from "../../db/autoincrement.js";
import { decrease } from "../../db/autoincrement.js";

let db= await con();
let collection = db.collection("Incidents")
let collectionPc = db.collection("Computers")

const peripheralArray = [ "Mouses", "Keyboards", "Screens", "Diadems_Gamers"];

const peripheralMapping = {
    'Mouses': 'Mo',
    'Keyboards': 'Tc',
    'Screens': 'Pt',
    'Diadems_Gamers': 'Dg'
}

export async function statusPC(idPC) {
    try {
        let statusResultsPC = await collection.find({ Inc_PC : idPC }).sort({ _id : 1}).toArray();
        if (statusResultsPC.length == 0) {
            const validStatus = await collectionPc.findOneAndUpdate({ _id: `CP-${idPC}` }, {$set: { Cp_Status : 2}});
            peripheralArray.forEach(peripheral => {
                const peripheralIdentifier = peripheralMapping[peripheral];
                let collectionPeripheral = db.collection(`${peripheral}`);
                const checkPeripheral = collectionPeripheral.findOneAndUpdate({ [peripheralIdentifier + "_PC"] : `CP-${idPC}` }, {$set: { [peripheralIdentifier + "_Status"] : 2}});
            });
        }else {
            peripheralArray.forEach(peripheral => {
                const peripheralInIncidence = statusResultsPC.find(incidence => incidence.Inc_Peripheral === peripheral);
                if (!peripheralInIncidence) {
                    const peripheralIdentifier = peripheralMapping[peripheral];
                    let collectionPeripheral = db.collection(`${peripheral}`);
                    const checkPeripheral = collectionPeripheral.findOneAndUpdate({ [peripheralIdentifier + "_PC"] : `CP-${idPC}` }, {$set: { [peripheralIdentifier + "_Status"] : 2}});
                }
            });
        }
    } catch (error) {
        console.log(error);
    }
}
export const getIncidentsV100 = async ( req,res)=>{
    try {
        if(!req.rateLimit) return;
        let getResults = await collection.find({}).sort({ _id : 1}).toArray();
        res.send(getResults)
    } catch (error) {
        errorcontroller(error, res);
    }
}

export const postIncidentsV100 = async (req,res)=>{
    try{
        if(!req.rateLimit) return;
        const id =  await increment("Incidents");
        let data = {_id: id, ...req.body, Inc_Solution_Date : (req.body.Inc_Solution_Date == null) ? null : new Date(req.body.Inc_Solution_Date), Inc_Status: "Pending", Inc_Creation_Date : new Date()};
        if (data.Inc_PC) {
            const checkPc = await collectionPc.findOneAndUpdate({ _id: `CP-${data.Inc_PC}` }, {$set: { Cp_Status : 1}});
            if (!checkPc) {
                return res.status(409).send({status: 409, message: `The pc with the ID: 'CP-${data.Inc_PC}', is not registered in the database.`});
            }
            if (data.Inc_Peripheral) {
                const peripheralMapping = {
                    'Mouses': 'Mo',
                    'Keyboards': 'Tc',
                    'Screens': 'Pt',
                    'Diadems_Gamers': 'Dg'
                }
                const peripheralIdentifier = peripheralMapping[data.Inc_Peripheral];
                let collectionPeripheral = db.collection(`${data.Inc_Peripheral}`);
                const checkPeripheral = await collectionPeripheral.findOneAndUpdate({ [peripheralIdentifier + "_PC"] : `CP-${data.Inc_PC}` }, {$set: { [peripheralIdentifier + "_Status"] : 1}});
                if (!checkPeripheral) {
                    return res.status(409).send({status: 409, message: `The peripheral with the ID: '${peripheralIdentifier}_PC-${data.Inc_PC}', is not related to the selected computer.`});
                }
            }
        }
        let postResult = await collection.insertOne(data);
        res.status(200).send({status: 200, message: `Document with id ${id} has been created Successfully`});
    }catch(error){ 
        console.log(error);
        await decrease("Incidents");
        errorcontroller(error, res);
    }
}

export const putIncidentsV100 = async (req,res)=>{
    let filter = parseInt(req.query.id, 10)
    try{
        if(!req.rateLimit) return;
        let updates = {...req.body, Inc_Solution_Date : (req.body.Inc_Solution_Date == null) ? null : new Date(req.body.Inc_Solution_Date), Inc_Status: "Pending"};
        if (updates.Inc_PC) {
            const checkPc = await collectionPc.findOneAndUpdate({ _id: `CP-${updates.Inc_PC}` }, {$set: { Cp_Status : 1}});
            if (!checkPc) {
                return res.status(409).send({status: 409, message: `The pc with the ID: 'CP-${updates.Inc_PC}', is not registered in the database.`});
            }
            if (updates.Inc_Peripheral) {
                const peripheralMapping = {
                    'Mouses': 'Mo',
                    'Keyboards': 'Tc',
                    'Screens': 'Pt',
                    'Diadems_Gamers': 'Dg'
                }
                const peripheralIdentifier = peripheralMapping[updates.Inc_Peripheral];
                let collectionPeripheral = db.collection(`${updates.Inc_Peripheral}`);
                const checkPeripheral = await collectionPeripheral.findOneAndUpdate({ [peripheralIdentifier + "_PC"] : `CP-${updates.Inc_PC}` }, {$set: { [peripheralIdentifier + "_Status"] : 1}});
                if (!checkPeripheral) {
                    return res.status(409).send({status: 409, message: `The peripheral with the ID: '${peripheralIdentifier}_PC-${data.Inc_PC}', is not related to the selected computer.`});
                }
            }
            statusPC(updates.Inc_PC);
        }
        let updateResult = await collection.updateOne({_id: filter},{$set: updates});
        if (updateResult.modifiedCount > 0) {
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

export const deleteIncidentsV100 = async (req,res)=>{
    try {
        if(!req.rateLimit) return;
        let id = req.body.id
        let resultsPC = await collection.findOne({ _id : id });
        let deleteResult  = await collection.deleteOne({"_id":id})
        if (resultsPC.length != 0) {
            if (resultsPC.Inc_PC) {
                statusPC(resultsPC.Inc_PC);
            }
        }
        deleteResult.deletedCount === 1
        ? res.status(200).send({ status: 200, message:`Document with id ${id} has been successfully deleted`})
        : res.status(404).send({ status: 404, message:`Document with id ${id} has not been found`});
    } catch (error) {
        console.log(error);
        errorcontroller(error, res)
    }
}