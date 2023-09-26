import { con } from "../../db/atlas.js";
import errorcontroller from "../../middleware/errorsMongodb.js";
import { increment } from "../../db/autoincrement.js";
import { decrease } from "../../db/autoincrement.js";

let db= await con();
let collection = db.collection("Incidents");
let collectionC = db.collection("Classroom");


export const totalIncidentsV101 = async ( req,res)=>{
    try {
        if(!req.rateLimit) return;
        const id = parseInt(req.query.id, 10)
        let getTotal = await collection.countDocuments();
        res.send({ total : getTotal })
    } catch (error) {
        errorcontroller(error, res);
    }
}

export const totalIncidentsPerClassroomV101 = async ( req,res)=>{
    try {
        if(!req.rateLimit) return;
        const id = parseInt(req.query.id, 10)
        let getTotal = await collection.countDocuments({ Inc_Classroom: id });
        res.send({ total : getTotal })
    } catch (error) {
        errorcontroller(error, res);
    }
}

export const totalIncidentsPerAreaV101 = async ( req,res)=>{
    try {
        if(!req.rateLimit) return;
        const id = parseInt(req.query.id, 10)
        let getTotal = await collection.countDocuments({ Inc_Area: id });
        res.send({ total : getTotal })
    } catch (error) {
        errorcontroller(error, res);
    }
}

export const getIncidentsPerUserV101 = async ( req,res)=>{
    try {
        if(!req.rateLimit) return;
        const id = parseInt(req.query.id, 10)
        let getIncidents = await collection.find({ Inc_User: id }).sort({ _id : 1}).toArray();
        res.send(getIncidents)
    } catch (error) {
        errorcontroller(error, res);
    }
}

export const getIncidentsPerAreaV101 = async ( req,res)=>{
    try {
        if(!req.rateLimit) return;
        const id = parseInt(req.query.id, 10)
        let getIncidents = await collection.find({ Inc_Area: id }).sort({ _id : 1}).toArray();
        res.send(getIncidents)
    } catch (error) {
        errorcontroller(error, res);
    }
}

export const getIncidentsPerClassroomV101 = async ( req,res)=>{
    try {
        if(!req.rateLimit) return;
        const id = parseInt(req.query.id, 10)
        let getIncidents = await collection.find({ Inc_Classroom: id }).sort({ _id : 1}).toArray();
        res.send(getIncidents)
    } catch (error) {
        errorcontroller(error, res);
    }
}

export const getIncidentsPerPriorityV101 = async ( req,res)=>{
    try {
        if(!req.rateLimit) return;
        const id = parseInt(req.query.id, 10)
        let getIncidents = await collection.find({ Inc_Category: id }).sort({ _id : 1}).toArray();
        res.send(getIncidents)
    } catch (error) {
        errorcontroller(error, res);
    }
}

export const getIncidentsPerTypeV101 = async ( req,res)=>{
    try {
        if(!req.rateLimit) return;
        const id = parseInt(req.query.id, 10)
        let getIncidents = await collection.find({ Inc_Type: id }).sort({ _id : 1}).toArray();
        res.send(getIncidents)
    } catch (error) {
        errorcontroller(error, res);
    }
}

export const getIncidentsIDV101 = async ( req,res)=>{
    try {
        if(!req.rateLimit) return;
        const id = parseInt(req.query.id, 10)
        let getIncidents = await collection.find({ _id: id }).sort({ _id : 1}).toArray();
        res.send(getIncidents)
    } catch (error) {
        errorcontroller(error, res);
    }
}

export const getIncidentsPerPCV101 = async ( req,res)=>{
    try {
        if(!req.rateLimit) return;
        const id = parseInt(req.query.id, 10)
        let getIncidents = await collection.find({ Inc_PC: id }).sort({ _id : 1}).toArray();
        res.send(getIncidents)
    } catch (error) {
        errorcontroller(error, res);
    }
}

export const getIncidentsPerDateV101 = async ( req,res)=>{
    try {
        if(!req.rateLimit) return;
        function parseDate(date, boolDate) {
            const [year, month, day] = date.split('-').map(Number);
            let hour = boolDate == 1 ? 12 : 0;
            return new Date(year, month - 1, day, hour, 0, 0);
        }
          
        const { start, end, filter } = req.body;
        const startDate = parseDate(start, 0);
        const endDate = parseDate(end, 1);
        
        console.log(startDate , endDate);
        let getIncidentsDate
        switch (filter) {
            case "solutionDate":
                getIncidentsDate = await collection.find({ Inc_Solution_Date: { $gte : startDate , $lte : endDate }}).sort({ _id : 1}).toArray();
                break;
            case "incidentDate":
                getIncidentsDate = await collection.find({ Inc_Creation_Date: { $gte : startDate , $lte : endDate }}).sort({ _id : 1}).toArray();
                console.log(getIncidentsDate);
            break;
        }
        res.send(getIncidentsDate)
    } catch (error) {
        console.log(error);
        errorcontroller(error, res);
    }
}