import axios from "axios";

let url = `http://${import.meta.env.VITE_HOSTNAME}:${import.meta.env.VITE_PORT_BACKEND}/Area`

// 1.0.0 = get Areas
export let getAreas = async (onProgress, token)=>{
    try{
        const response = await axios.get(url, {
            headers: {
                'content-Type': 'application/json',
                'Accept-Version': '1.0.0',
                'Authorization' : token,
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

// 1.0.2 = post Areas
export let postAreas = async (User, onProgress, token)=>{
    try{
        const response = await axios.post(`${url}`, User, {
            headers: {
                'content-Type': 'application/json',
                'Accept-Version': '1.0.2',
                'Authorization' : token,
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

export let putAreas = async (User, onProgress, token, ID)=>{
    try{
        const response = await axios.put(`${url}?id=${ID}`, User, {
            headers: {
                'content-Type': 'application/json',
                'Accept-Version': '1.0.2',
                'Authorization' : token,
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

export let deleteAreas = async (User, onProgress, token)=>{
    try{
        const response = await axios.delete(`${url}`, User, {
            headers: {
                'content-Type': 'application/json',
                'Accept-Version': '1.0.0',
                'Authorization' : token,
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