import axios from "axios";

let url = `http://${import.meta.env.VITE_HOSTNAME}:${import.meta.env.VITE_PORT_BACKEND}/Incidents`

// 1.0.0 = get incidents
// 1.0.1 = get incidents per ID
// 1.1.0 = get incidents per User
// 1.2.0 = get incidents per Area
// 1.3.0 = get incidents per Classroom
// 1.4.0 = get incidents per priority
// 1.5.0 = get incidents per type
// 1.6.0 = get incidents per PC
export let getIncidents = async (User, onProgress, token, version)=>{
    try{
        const response = await axios.get(url, {
            headers: {
                'content-Type': 'application/json',
                'Accept-Version': version,
                'Authorization' : token,
            },
            params: {
                id: User
            },
            onUploadProgress: (progressEvent) => {
                const progress = (progressEvent.loaded / progressEvent.total) * 100;
                onProgress(progress);
            }
        });
        return (response);      
    }catch(error){
        return (error.response);
    }
}

// 1.0.0 = total incidents
// 1.1.0 = total incidents per Classroom
// 1.2.0 = total incidents per Area
export let totalIncidents = async (User, onProgress, token, version)=>{
    try{
        const response = await axios.get(`${url}/total-incidents`, User, {
            headers: {
                'content-Type': 'application/json',
                'Authorization' : `${token}`,
                'Accept-Version': version
            },
            onUploadProgress: (progressEvent) => {
                const progress = (progressEvent.loaded / progressEvent.total) * 100;
                onProgress(progress);
            }
        });
        return (response);      
    }catch(error){
        return (error.response);
    }
}

export let incidentsDate = async (User)=>{
    try{
        const response = await axios.get(`${url}/incidents-date`, {
            headers: {
                'content-Type': 'application/json',
                'Accept-Version': '1.0.0'
            }
        });
        return (response);      
    }catch(error){
        return (error.response);
    }
}

export let postIncidents = async (User)=>{
    try{
        const response = await axios.post(`${url}`, {
            headers: {
                'content-Type': 'application/json',
                'Accept-Version': '1.0.2'
            }
        });
        return (response);      
    }catch(error){
        return (error.response);
    }
}

export let putIncidents = async (User)=>{
    try{
        const response = await axios.put(`${url}`, {
            headers: {
                'content-Type': 'application/json',
                'Accept-Version': '1.0.2'
            }
        });
        return (response);      
    }catch(error){
        return (error.response);
    }
}

export let deleteIncidents = async (User)=>{
    try{
        const response = await axios.delete(`${url}`, {
            headers: {
                'content-Type': 'application/json',
                'Accept-Version': '1.0.0'
            }
        });
        return (response);      
    }catch(error){
        return (error.response);
    }
}