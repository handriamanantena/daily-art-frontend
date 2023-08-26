import React, {useState} from 'react'
import jwt_decode from "jwt-decode";

const AuthContext = React.createContext({
    isLoggedIn: false,
    token: '',
    userName : '',
    email: '',
    profilePicture: '',
    login: (token) => {},
    logout: () => {}
});

export const AuthProvider = (props) => {
    const [token, setToken] = useState(null);
    const [isUserLoggedIn, setLoggedIn] = useState(false);
    const [userName, setUserName] = useState(null);
    const [email, setEmail] = useState(null);
    const [profilePicture, setProfilePicture] = useState(null);

    const loginHandler = (token) => {
        setLoggedIn(true);
        setToken(token);
        if(token) {
            let decoded = jwt_decode(token, {alg :"HS256"});
            console.log("decoded" + JSON.stringify( decoded));
            setUserName(decoded.userName);
            setEmail(decoded.email);
            setProfilePicture(decoded.profilePicture);
        }
    };

    const logoutHandler = async () => {
        setLoggedIn(false);
        setToken('');
        setUserName('');
        setEmail('');
        setProfilePicture('');
        console.log("logout");
        const host = process.env.NEXT_PUBLIC_PICTURES_API_HOST + process.env.NEXT_PUBLIC_PICTURES_API_PORT + "/logout";
        const res = await fetch(host, {
            method: 'get',
            credentials: 'include'
        });
    };

    const contextValue = {
        isLoggedIn : isUserLoggedIn,
        token : token,
        login: loginHandler,
        userName: userName,
        email: email,
        profilePicture: profilePicture,
        logout: logoutHandler
    };

    return (<AuthContext.Provider value={contextValue}>
        {props.children}
    </AuthContext.Provider>);
}



export default AuthContext;