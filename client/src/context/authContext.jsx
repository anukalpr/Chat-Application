import Cookie from "js-cookie";
import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

function AuthProvider({ children }) {
  let initialUserState;
  try {
    const stored = Cookie.get("jwt") || localStorage.getItem("messanger");
    initialUserState = stored ? JSON.parse(stored) : undefined;
  } catch (err) {
    console.error("Failed to parse auth state:", err);
    initialUserState = undefined;
  }

  const [authUser, setAuthUser] = useState(initialUserState);

  return (
    <AuthContext.Provider value={[authUser, setAuthUser]}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
export default AuthProvider;