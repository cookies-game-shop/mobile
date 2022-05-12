import {createContext, useContext} from 'react';

export const UserContext = createContext({
  token: false,
  setToken: () => {},
  isAdmin: false,
  setIsAdmin: () => {},
});
export const useUserContext = () => useContext(UserContext);
