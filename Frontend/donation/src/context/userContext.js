import { useContext, createContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({children}) => {

    const [loginuser, setLoginuser] = useState(() => {
        // Initialize from localStorage (or null if not found)
        const storedUser = localStorage.getItem("userDetails");
        return storedUser ? JSON.parse(storedUser) : null;
      });


  return (
        <UserContext.Provider value={{loginuser, setLoginuser}}>
            {children}
        </UserContext.Provider>
  );
};


//or
// export  {userProvider, UserContext};

export const UseUser =()=>{
    return(useContext(UserProvider));
}
