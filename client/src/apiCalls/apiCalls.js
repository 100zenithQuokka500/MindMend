import axios from "axios";
const baseUrl = "/api/v1";
const getAndDeleteReq = async(url , method)=>{
    try {
        const response = await axios({
            url,
            method,
            headers:{
                "Content-Type":"application/json"
            },
            withCredentials:true,
        })
        return response?.data;
    } catch (error) {
        throw error;
    }
}

const postAndPatchReq = async(url , method , data , isFormData=false)=>{
    try {
        const response = await axios({
            url,
            method,
            data,
            headers:{
                "Content-Type":isFormData ? "multipart/form-data" : "application/json"
            },
            withCredentials:true
        })
        return response?.data;
    } catch (error) {
        throw error;
    }
}

export {baseUrl , getAndDeleteReq , postAndPatchReq};