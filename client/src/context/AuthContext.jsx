import { createContext, useContext, useEffect, useState } from "react";
import { getToken } from "../utils/auth";
import { getUser } from "../services/authService";

//create AuthContext to store user info and auth-related functions
export const AuthContext = createContext();

//create AuthProvider Component to wrap the entire app and provide auth data to all components
export const AuthProvider = ({children}) => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //Load user when app starts(on refresh / first load)
  useEffect(() => {
    const loadUser = async () => {
      try {
        //get token from localStorage 
        const token = getToken();
        //If not token, user is not logged in
        if(!token) {
          setLoading(false);
          return;
        };
        //If token exists, fetch user data from backend
        const userData = await getUser(token);
        //save userData us State
        setUser(userData);
      } catch (error) {
        console.error("Auth load failed", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  //Logout function
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };
  //Provide data to the whole app
  return (
    <AuthContext.Provider value={{user, loading, setUser, logout}}>
      {children}
    </AuthContext.Provider>
  );
}
//Custom hook for easy access to auth context
export const useAuth = () => {
  return useContext(AuthContext);
};