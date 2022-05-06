import {createContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const AuthContext = createContext();

function AuthContextProvider(props) {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = AsyncStorage.getItem('token');
    if (token) {
      setLoggedIn(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{loggedIn}}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
export {AuthContextProvider};
