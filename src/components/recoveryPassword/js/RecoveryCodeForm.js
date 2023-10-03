import { modalError , modalSendEmail } from "../../modalTemplates";
import { SendRecoveryCode } from "../../../services/sendRecoveryCode";

export let sendRecoveryCode = async (data, onProgress)=>{
    let { 
        Username:name_User, Email:email_User
    } = data
   
    let User = {
        name_User, email_User
    }
    let response = await SendRecoveryCode(User, onProgress);
    switch (response.statusText) {
        case "OK":
            modalSendEmail(response);
            break;
    
        default:
            modalError(response);
            break;
    }
    return response
}