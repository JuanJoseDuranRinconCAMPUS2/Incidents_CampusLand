import { UserCreation } from "../../../services/UserCreation";

export let userCreation = async (data, onProgress)=>{
    let { 
        Username:name_User, Email:email_User, TypeDoc:typeDoc_User, Identification:identification_User, Age:age_User,
        Gender:gender_User, Celphone:cellphone_User, Password:password_User , Rol , Classroom
    } = data
    let roles_User
    switch (Rol) {
        case 1:
          roles_User = ["CsWscGexsiv6578"];
          break;
        case 2:
          roles_User = ["CsWscEhspi6896"];
          break;
        case 3:
          roles_User = ["CsWscXvepmrk0769"];
          break;
        default:
          roles_User = ["CsWscGexsiv6578"];
    }      
    switch (Classroom) {
        case 1:
            roles_User.push('YsWscQ1t3735');
            break;
        case 2:
            roles_User.push('YsWscQ2v9865');
            break;
        case 3:
            roles_User.push('YsWscQ3z9dc3');
            break;
        case 4:
            roles_User.push('YsWscN1t0141');
            break;
        case 5:
            roles_User.push('YsWscN2v3265');
            break;
        case 6:
            roles_User.push('YsWscN3z7he8');
            break;
        case 7:
            roles_User.push('YsWscR1x6891');
            break;
        case 8:
            roles_User.push('YsWscR2x02a2');
            break;
        default:
            break;
    }
    let User = {
        name_User, email_User, typeDoc_User, identification_User, age_User, gender_User, cellphone_User, password_User, roles_User,
        versions_User: [ "1.0.0", "1.0.1", "1.0.2", "1.1.0", "1.2.0", "1.3.0", "1.4.0", "1.5.0", "1.6.0", "1.7.0"]
    }
    let response = await UserCreation(User, onProgress);

    console.log(response);
}