import config from '../../../utils/localStorage';
import { LoginUser } from "../../../services/LoginUser";
import { modalError , modalSignUp } from "../../modalTemplates";

export let loginUser = async (data, onProgress)=>{
    config.dataMyUserInfo();
    let { 
        Username:name_User, Password:password_User
    } = data
   
    let User = {
        name_User, password_User
    }
    let response = await LoginUser(User, onProgress);
    switch (response.statusText) {
        case "Created":
            let infoU = response.data
            let newUserLocal = { idUser: infoU.User , roles: infoU.rolsUser , userName : name_User}
            localStorage.setItem("myUserInfo", JSON.stringify(newUserLocal));
            return infoU.rolsUser[0];
            break;
        default:
            modalError(response);
            break;
    }
}