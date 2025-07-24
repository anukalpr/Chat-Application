import Cookie from "js-cookie";
import { createContext, useContext, useState } from "react";
export const AuthContext=createContext();

function authProvider({children}){
    const initialUserState=Cookie.get('jwt')||localStorage.getItem("messanger");
    const [authUser,setAuthUser]=useState(initialUserState?JSON.parse(initialUserState):undefined);
    return(
        <AuthContext.Provider value={[authUser, setAuthUser]}>
            {children}
        </AuthContext.Provider>
    )
}
export const useAuth=()=>useContext(AuthContext);
export default authProvider;