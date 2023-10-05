import axios from "axios";

let url = `http://${import.meta.env.VITE_HOSTNAME}:${import.meta.env.VITE_PORT_BACKEND}/Classroom`

export let getClassroom = async (onProgress, token)=>{
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

export let postClassroom = async (User, onProgress, token)=>{
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

export let putClassroom = async (User, onProgress, token, ID)=>{
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

export let deleteClassroom = async (User, onProgress, token)=>{
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