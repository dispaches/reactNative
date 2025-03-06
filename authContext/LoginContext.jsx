import React, { createContext, useState } from "react";


export const LoginContext = createContext(null);

export const LoginProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(null); // Stores either "user" or "rider"

  return (
    <LoginContext.Provider value={{ userRole, setUserRole }}>
      {children}
    </LoginContext.Provider>
  );
};
export default LoginProvider;
