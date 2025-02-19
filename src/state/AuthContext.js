import React from "react";

const initialContextValue = {
  isLogado: false,
  setIsLogado: (arg) => {},
  username: "",
  setUserName: (arg) => {},
};

const AuthContext = React.createContext(initialContextValue); //boolean

const AuthProvider = ({ children }) => {
  const [isLogado, setIsLogado] = React.useState(false);
  const [username, setUserName] = React.useState("");

  return (
    <AuthContext.Provider
      value={{ isLogado, setIsLogado, username, setUserName }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuthContext = () => React.useContext(AuthContext);

export { AuthContext, AuthProvider, useAuthContext };
