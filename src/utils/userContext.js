import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const useUserContext = () => {
  const context = useContext(UserContext);
  return context;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);

  const updateUser = (userData) => {
    setUser(userData);
    setIsAuth(userData !== null);
  };

  return (
    <UserContext.Provider value={{ user: user || {}, isAuth, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};
