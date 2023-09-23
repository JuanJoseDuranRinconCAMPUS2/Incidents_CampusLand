import { con } from "./atlas.js";

let db= await con();
let autoincrement = db.collection("autoincrement");

export async function  increment(coleccion){
    const sequenceDocument = await autoincrement.findOneAndUpdate(
        { _id: `${coleccion}Id` },
        { $inc: { sequence_value: 1 } },
        { returnDocument: "after" }
    );
    return sequenceDocument.sequence_value;
}