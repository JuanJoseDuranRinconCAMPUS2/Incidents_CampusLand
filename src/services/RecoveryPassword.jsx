import axios from "axios";

let url = `http://${import.meta.env.VITE_HOSTNAME}:${import.meta.env.VITE_PORT_BACKEND}/RecoveryPassword`

export let RecoveryPassword = async (User, onProgress)=>{
    try{
        const response = await axios.post(url, User, {
            headers: {
                'content-Type': 'application/json',
                'Accept-Version': '1.1.0'
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