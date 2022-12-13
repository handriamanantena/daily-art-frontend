import React, {useState} from 'react'

const AuthContext = React.createContext({
    isLoggedIn: false,
    token: '',
    login: (token) => {},
    logout: () => {}
});

export const AuthProvider = (props) => {
    const [token, setToken] = useState(null);
    const [isUserLoggedIn, setLoggedIn] = useState(false);

    const loginHandler = (token) => {
        setLoggedIn(true);
        setToken(token);
    }

    const logoutHandler = () => {
        setLoggedIn(false);
        setToken(null);
    }

    const contextValue = {
        isLoggedIn : isUserLoggedIn,
        token : token,
        login: loginHandler,
        logout: logoutHandler
    }

    return (<AuthContext.Provider value={contextValue}>
        {props.children}
    </AuthContext.Provider>);
}



export default AuthContext;