import { LoginUser } from "../../../services/LoginUser";
import { modalError , modalSignUp } from "../../modalTemplates";

export let loginUser = async (data, onProgress)=>{
    let { 
        Username:name_User, Password:password_User
    } = data
   
    let User = {
        name_User, password_User
    }
    let response = await LoginUser(User, onProgress);
    console.log(response);
    switch (response.statusText) {
        case "Created":
            console.log(response);
            break;
    
        default:
            modalError(response);
            break;
    }
    return response
}