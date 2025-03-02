import React, { createContext, useState } from "react";

export const LoginContext = createContext(null);

export const LoginProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [rider, setRider] = useState(null);

  return (
    <LoginContext.Provider value={{ user, setUser, rider, setRider }}>
      {children}
    </LoginContext.Provider>
  );
};
export default LoginProvider;