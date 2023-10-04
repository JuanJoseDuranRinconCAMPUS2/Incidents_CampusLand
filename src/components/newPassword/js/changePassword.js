import { modalError , modalChangePW } from "../../modalTemplates";
import { RecoveryPassword } from "../../../services/RecoveryPassword";

export let changePassword = async (data, onProgress)=>{
    let { 
        Username:name_User, Email:email_User,
        Password:password_User , CodePW:code_Recovery
    } = data
   
    let User = {
        name_User, email_User, password_User, code_Recovery
    }
    let response = await RecoveryPassword(User, onProgress);
    switch (response.statusText) {
        case "OK":
            modalChangePW(response);
            break;
    
        default:
            modalError(response);
            break;
    }
    return response
}