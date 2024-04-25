import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("site") || "");
  const [username, setUsername] = useState(localStorage.getItem("username") || "");
  const [userID, setUserID] = useState(localStorage.getItem("userID") || "");
  const navigate = useNavigate();
  
  const loginAction = async (data) => {
    try {
      const response = await fetch("http://localhost:8080/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      console.log(res);
      if (res && !(res.message === "Error: Invalid Credentials!" && !(res.isEmpty())) ) {
        setUser(res.user);
        setToken(res.token);
        localStorage.setItem("site", res.token);
        localStorage.setItem("username", res.username);
        localStorage.setItem("userID", res.id);
        navigate(`/myaccount/${localStorage.getItem('username')}`);
        return;
      }
        window.alert(res.message);
      
      throw new Error(res.message);
      
      
    } catch (err) {
      window.alert("Error: Invalid Credentials!");
    }
  };

  const logOut = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("site");
    localStorage.removeItem("username");
    localStorage.removeItem("profilePic");
    navigate("/");
  };
  
  

  return (
    <AuthContext.Provider value={{ token, user, loginAction, logOut }}>
      {children}
    </AuthContext.Provider>
  );

};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};

