import { postIncidents } from "../../../../services/Incidents";
import { modalError, modalPost } from "../../../modalTemplates";

export let postInc = async (data, onProgress, token)=>{
    let { 
        PC:pc_Incident, Category:category_Incident, Classroom:classroom_Incident, Description:desc_Incident, Peripheral:peripheral_Incident,
        Type:type_Incident, user_Incident , Area:area_Incident
    } = data
    console.log(data);

    let User = {
        pc_Incident, category_Incident, classroom_Incident, desc_Incident, peripheral_Incident, type_Incident,"solution_Incident": null,
        "desc_Solution_Incident": null, user_Incident, area_Incident
    }


    switch (User.type_Incident) {
        case 1:
        case 2:
            if (User.peripheral_Incident == 0) {
                User.peripheral_Incident = null;
            }
            break;
    
        default:
            User.pc_Incident = null
            User.peripheral_Incident = null
            break;
    }
    let response = await postIncidents(User, onProgress, token);
    switch (response.statusText) {
        case "OK":
            modalPost(response);
            break;

        default:
            modalError(response);
            break;
    }
    return response
}