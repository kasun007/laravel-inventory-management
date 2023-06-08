import { createContext, useContext, useState } from "react";

const StateContext = createContext({
  currentUser: null,
  token: null,
  setUser: () => {},
  setToken: () => {},
  setNotification: () => {},
});
export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: "admin",
  });

  const [notification, _setNotification] = useState(null); // [message, setMessage
  const [token, _setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));

  const setNotification = (message) => {
    _setNotification(message);
    setTimeout(() => {
      _setNotification("");
    }, 3000);
  };

  const setToken = (token) => {
    _setToken(token);

    if (token) {
      console.log("token is", token);
      localStorage.setItem("ACCESS_TOKEN", token);
    } else {
      localStorage.removeItem("ACCESS_TOKEN");
    }
  };

  return (
    <StateContext.Provider
      value={{
        user,
        token,
        setUser,
        setToken,
        setNotification,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
