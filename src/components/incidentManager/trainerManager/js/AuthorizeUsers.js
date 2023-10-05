import { authorizeUsers } from "../../../../services/UserCreation";
import { modalError, modalAutorizate } from "../../../modalTemplates";

export let AuthorizaUser = async (data, onProgress, token)=>{
    let response = await authorizeUsers(data, onProgress, token);
    switch (response.statusText) {
        case "OK":
            modalAutorizate(response);
            break;

        default:
            modalError(response);
            break;
    }
    return response
}