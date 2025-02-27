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
    const [isError , setIsError] = useState(false);
    const [isLoading , setIsLoading] = useState(false);

    useEffect(()=>{
        const currentUser = async()=>{
            try {
                setIsLoading(true);
                const response = await getAndDeleteReq(`${baseUrl}/user/me` , "get");
                console.log("response from AuthContext! " , response?.data);
                setUser(response?.data);
                return response?.data;
            } catch (error) {
                console.log("error from AuthContext! " , error);
                setIsError(true);
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
            console.log("the response AuhtContext! " , response);
            setUser(response?.data);
            return response;
        } catch (error) {
            console.log("error from AuthContext! " , error);
            setIsError(true);
        }finally{
            setIsLoading(false);
        }
    }
    const loginUser = async(data)=>{
        try {
            setIsLoading(true);
            const response = await postAndPatchReq(`${baseUrl}/user/signin` , "post" , data);
            console.log("response from AuthContext! " , response?.data);
            setUser(response?.data);
            return response;
        } catch (error) {
            console.log("error from AuthContext! " , error);
            setIsError(true);
        }finally{
            setIsLoading(false);
        }
    }
    const logoutUser = async()=>{
        try {
            setIsLoading(true);
            const response = await getAndDeleteReq(`${baseUrl}/user/logout` , "get");
            console.log("response from AuthContext! " , response);
            setUser(null);
            return response;
        } catch (error) {
            console.log("error from AuthContext! " , error);
            setIsError(true);
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