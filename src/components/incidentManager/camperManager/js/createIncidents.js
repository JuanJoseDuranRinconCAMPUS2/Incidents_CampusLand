import { modalError } from "../../../modalTemplates";
import { getIncidents } from "../../../../services/Incidents";
import { getType_Inc } from "../../../../services/Type_Inc";
import { getCategory_Inc } from "../../../../services/Category_Inc";
import { getClassroom } from "../../../../services/Classroom";
import { getAreas } from "../../../../services/Area";


export let getIncidentsCon = async (User, onProgress, token, version) => {
    let { data: Areas } = await getAreas(onProgress, token);
    let { data: Types } = await getType_Inc(onProgress, token);
    let { data: Categories } = await getCategory_Inc(onProgress, token);
    let { data: Classroom } = await getClassroom(onProgress, token);
    switch (response.statusText) {
      case "OK":
        
        let dataIncidents = response.data;
  
        updateNames(dataIncidents, Classroom, "Inc_Classroom", "_id", "Sln_Name");
        updateNames(dataIncidents, Areas, "Inc_Area", "_id", "A_Name");
        updateNames(dataIncidents, Categories, "Inc_Category", "_id", "Cat_Name");
        updateNames(dataIncidents, Types, "Inc_Type", "_id", "Typ_Name");
        renameIdKey(dataIncidents);
        return dataIncidents;
        break;
  
      default:
        modalError(response);
        return false;
        break;
    }
    return response;
  };