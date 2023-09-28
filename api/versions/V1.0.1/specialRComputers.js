import { con } from "../../db/atlas.js";
import errorcontroller from "../../middleware/errorsMongodb.js";
import { increment } from "../../db/autoincrement.js";
import { decrease } from "../../db/autoincrement.js";

let db= await con();
let collection = db.collection("Computers");
let collectionC = db.collection("Classroom");

const peripheralArray = [ "Mouses", "Keyboards", "Screens", "Diadems_Gamers"];

const peripheralMapping = {
    'Mouses': 'Mo',
    'Keyboards': 'Tc',
    'Screens': 'Pt',
    'Diadems_Gamers': 'Dg'
}

export const totalComputersPerClassroomV101 = async ( req,res)=>{
    try {
        if(!req.rateLimit) return;
        const id = parseInt(req.query.id, 10)
        let getTotal = await collection.countDocuments({ Cp_Classroom: id });
        res.send({ total : getTotal })
    } catch (error) {
        errorcontroller(error, res);
    }
}

export const totalComputersPerAreaV101 = async ( req,res)=>{
    try {
        if(!req.rateLimit) return;
        const id = parseInt(req.query.id, 10)
        let getClassroom = await collectionC.find({ Sln_Areas: id }).toArray();
        let getTotal = 0

        const promises = getClassroom.map(async (classroom) => {
            const count = await collection.countDocuments({ Cp_Classroom: classroom._id });
            getTotal += count;
        });

        await Promise.all(promises);
        res.send({ total : getTotal })
    } catch (error) {
        errorcontroller(error, res);
    }
}

export const getComputerPerClassroomV101 = async ( req,res)=>{
    try {
        if(!req.rateLimit) return;
        const id = parseInt(req.query.id, 10)
        let getComputers = await collection.find({ Cp_Classroom: id }).toArray();
        res.send(getComputers);
    } catch (error) {
        errorcontroller(error, res);
    }
}

export const getPeripheralsPerComputerV100 = async (req,res)=>{
    try{
        if(!req.rateLimit) return;
        const id = `CP-${parseInt(req.query.id, 10)}`;
        let getComputers = await collection.findOne({ _id: id });
        let getPeripheral = { PC : getComputers }
        const promises = peripheralArray.map(async (peripheral) => {
            const peripheralIdentifier = peripheralMapping[peripheral];
            let collectionPeripheral = db.collection(`${peripheral}`);
            getPeripheral[peripheral] = await collectionPeripheral.findOne({ [peripheralIdentifier + "_PC"] : id });
        });

        await Promise.all(promises);
        res.send(getPeripheral)
    }catch(error){ 
        errorcontroller(error, res);
    }
}
