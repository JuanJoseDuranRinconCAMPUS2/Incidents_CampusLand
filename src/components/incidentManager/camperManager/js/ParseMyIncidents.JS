import { modalError } from "../../../modalTemplates";
import { getIncidents } from "../../../../services/Incidents";

export let getIncidentsCon = async (User, onProgress, token, version)=>{
  
    let response = await getIncidents(User, onProgress, token, version);
    console.log(response);
    switch (response.statusText) {
        case "OK":
            console.log(response);
            break;
    
        default:
            modalError(response);
            return false
            break;
    }
    return response
}