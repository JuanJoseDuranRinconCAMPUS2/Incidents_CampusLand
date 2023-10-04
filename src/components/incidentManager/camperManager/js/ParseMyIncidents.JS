import { modalError } from "../../../modalTemplates";
import { getIncidents } from "../../../../services/Incidents";
import { getType_Inc } from "../../../../services/Type_Inc";
import { getCategory_Inc } from "../../../../services/Category_Inc";
import { getClassroom } from "../../../../services/Classroom";
import { getAreas } from "../../../../services/Area";

function updateNames(Incidents, items, propertyToUpdate, idProperty, nameProperty) {
    const idToNameMap = {};
    for (const item of items) {
      idToNameMap[item[idProperty]] = item[nameProperty];
    }
    for (const Incident of Incidents) {
      const itemId = Incident[propertyToUpdate];
      if (itemId !== null) {
        const itemName = idToNameMap[itemId];
        Incident[propertyToUpdate] = itemName;
      }
    }
  
    return Incidents;
  }


export let getIncidentsCon = async (User, onProgress, token, version)=>{
  
    let response = await getIncidents(2, onProgress, token, version);
    switch (response.statusText) {
        case "OK":
            let {data:Areas} = await getAreas(onProgress, token);
            let {data:Types} = await getType_Inc(onProgress, token);
            let {data:Categories} = await getCategory_Inc(onProgress, token);
            let {data:Classroom} = await getClassroom(onProgress, token);
            let dataIncidents = response.data;

            updateNames(dataIncidents, Classroom, 'Inc_Classroom', '_id', 'Sln_Name');
            updateNames(dataIncidents, Areas, 'Inc_Area', '_id', 'A_Name');
            updateNames(dataIncidents, Categories, 'Inc_Category', '_id', 'Cat_Name');
            updateNames(dataIncidents, Types, 'Inc_Type', '_id', 'Typ_Name');
            return dataIncidents
            break;
    
        default:
            modalError(response);
            return false
            break;
    }
    return response
}