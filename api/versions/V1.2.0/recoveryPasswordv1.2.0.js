import { con } from "../../db/atlas.js";
import errorcontroller from "../../middleware/errorsMongodb.js";


let db= await con();
let User_Api = db.collection("User_Api");
let User = db.collection("User");

export const updatePassword = async (req,res)=>{
    try{
        if(!req.rateLimit) return;

        let data= req.body;

        await User_Api.updateOne({ Name : data.Name, Email : data.Email },{$set: { Password : data.NewPassword}});
        await User.updateOne({ Name : data.Name, Email : data.Email },{$set: { Password : data.NewPassword}});

        res.status(200).send({
            status: 200, 
            message: `Password updated`, 
            usuario: data.Name
        });
    } catch (error) {
        errorcontroller(error);
    }
}