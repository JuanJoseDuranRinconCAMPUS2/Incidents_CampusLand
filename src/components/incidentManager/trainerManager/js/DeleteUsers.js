import { deleteUserNotAuthorized } from "../../../../services/UserCreation";
import { modalError, modalDelete } from "../../../modalTemplates";

export let DeleteUser = async (data, onProgress, token)=>{
    let response = await deleteUserNotAuthorized(data, onProgress, token);
    switch (response.statusText) {
        case "OK":
            modalDelete(response);
            break;

        default:
            modalError(response);
            break;
    }
    return response
}