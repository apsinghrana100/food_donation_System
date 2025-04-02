import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken") || null
  );
  const [user, setUser] = useState(() => {
          // Initialize from localStorage (or null if not found)
          const storedUser = localStorage.getItem("userDetails");
          return storedUser ? JSON.parse(storedUser) : null;
        });
  const [loader, setLoader] = useState(false);
  const [MessagePop, setMessagePop] = useState(false);
  const [message, setMessage] = useState({
    message: "Successfully added data",
    success: true,
  });

 

  const login = (token) => {
    console.log("i am login");
    localStorage.setItem("accessToken", token);
    setAccessToken(token);
    setUser(() => {
      // Initialize from localStorage (or null if not found)
      const storedUser = localStorage.getItem("userDetails");
      return storedUser ? JSON.parse(storedUser) : null;
    }); // Set user data
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userDetails");
    setAccessToken(null);
    setUser(null);

  };

  const MessageOperation=(message,issuccess)=>{
    setMessage({
      message: message,
      success: issuccess,
    });
    setMessagePop(true);
  };

  useEffect(() => {
    console.log("i am useeffcet inside of authcontext");
    const storedToken = localStorage.getItem("accessToken");

    if (storedToken) {
      try {
        const decodedToken = jwtDecode(storedToken);
        console.log(`Decodettoken ${storedToken}`);

        // ✅ Extract `exp` from the decoded token
        const { exp } = decodedToken;

        console.log(`Exp ${exp}`);

        // ✅ Check if the token is expired
        if (exp * 1000 < Date.now()) {
          console.log("Token expired, logging out...");
          logout();
        } else {
          console.log("i am else part");
          setAccessToken(storedToken);
          // setUser(decodedToken); // Store user info if needed
        }
      } catch (error) {
        console.error("Invalid token:", error);
        logout();
      }
    }
  }, []);

  useEffect(() => {
    if (user) {
      console.log("just checking ",user);
      localStorage.setItem("userDetails", JSON.stringify(user));
    }
  }, [user]);

  useEffect(() => {
    setTimeout(() => {
      setMessagePop(false);
    }, 3000);
  }, [MessagePop]);

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        login,
        logout,
        setLoader,
        loader,
        MessagePop,
        setMessagePop,
        message,
        setMessage,
        MessageOperation,
        setUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
