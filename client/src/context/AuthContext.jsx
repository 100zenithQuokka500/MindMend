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
                const errorMessage = error.response?.data?.message || "unable to find current user. Please refresh page!.";
                setIsError(errorMessage);
                return { success: false, error: errorMessage || "unable to find current user.." };
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
            const errorMessage = error.response?.data?.message || "Registration failed. Please try again.";
            setIsError(errorMessage);
            return { success: false, error: errorMessage || "Registration failed." };
        }finally{
            setIsLoading(false);
        }
    }
    const loginUser = async(data)=>{
        try {
            setIsError(null);
            setIsLoading(true);
            const response = await postAndPatchReq(`${baseUrl}/user/signin` , "post" , data);
            console.log("response from AuthContext! " , response?.data);
            setUser(response?.data);
            return { success: true, data: response?.data };
        } catch (error) {
            console.log("error from ! postAndPatchReq" , error?.response?.data);
            const errorMessage = error.response?.data?.error;
            setIsError(errorMessage);
            return { success: false, error: errorMessage || "login failed." };
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
            const errorMessage = error.response?.data?.message || "logout failed. Please try again.";
            setIsError(errorMessage);
            return { success: false, error: errorMessage || "Registration failed." };
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