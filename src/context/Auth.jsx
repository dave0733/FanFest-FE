import { createContext, useContext, useState } from 'react';

export const UserContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  return (
    <UserContext.Provider
      value={{
        token,
        setToken
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
