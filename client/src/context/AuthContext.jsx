/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import {baseUrl, getAndDeleteReq, postAndPatchReq} from "../apiCalls/apiCalls"

const AuthContext = createContext({
    user:null,
    registerUser:()=>{},
    loginUser:()=>{},
    logoutUser:()=>{},
    currentUser:()=>{},
})
const useAuth = ()=>useContext(AuthContext);
const AuthProvider = ({children})=>{
    const [user , setUser] = useState(null);
    const [isError , setIsError] = useState(null);
    const [isLoading , setIsLoading] = useState(false);

    useEffect(()=>{
        const currentUser = async()=>{
            try {
                setIsLoading(true);
                const response = await getAndDeleteReq(`${baseUrl}/user/me` , "get");
                setIsError(null);
                console.log("response from AuthContext! " , response?.data);
                setUser(response?.data);
                return { success: true, data: response?.data };
                // return response?.data;
            } catch (error) {
                console.log("error from getAndDeleteReq! " , error?.response?.data);
                throw error;
            }finally{
                setIsLoading(false);
            }
        }
        currentUser();
    } , [])
    const registerUser = async(data)=>{
        try {
            setIsLoading(true);
            const response = await postAndPatchReq(`${baseUrl}/user/signup` , "post" , data);
            setIsError(null);
            console.log("the response AuhtContext! " , response);
            setUser(response?.data);
            return { success: true, data: response?.data };
        } catch (error) {
            console.log("error from ! postAndPatchReq" , error?.response?.data);
            throw error;
        }finally{
            setIsLoading(false);
        }
    }
    const loginUser = async(data)=>{
        try {
            setIsLoading(true);
            const response = await postAndPatchReq(`${baseUrl}/user/signin` , "post" , data);
            setIsError(null);
            console.log("response from AuthContext! " , response?.data);
            setUser(response?.data);
            return { success: true, data: response?.data };
        } catch (error) {
            console.log("error from ! postAndPatchReq" , error?.response?.data);
            throw error;
        }finally{
            setIsLoading(false);
        }
    }
    const logoutUser = async()=>{
        try {
            setIsLoading(true);
            const response = await getAndDeleteReq(`${baseUrl}/user/logout` , "get");
            setIsError(null);
            console.log("response from AuthContext! " , response);
            setUser(null);
            return { success: true, data: response?.data };
        } catch (error) {
            console.log("error from ! getAndDeleteReq" , error?.response?.data);
            throw error;
        }finally{
            setIsLoading(false);
        }
    }
    return(
        <AuthContext.Provider value={{user , registerUser , loginUser , logoutUser , isError , isLoading}}>
            {children}
        </AuthContext.Provider>
    )
}

export {AuthProvider , useAuth}