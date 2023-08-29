import React, {useContext} from "react";
import AuthContext from "../../common/context/auth-context";

export const About = ({userInfo}) => {

    const ctx = useContext(AuthContext);

    return (<div className="bg-black m-10 p-10">
        <h1 className="text-white whitespace-normal">{userInfo.userName}</h1>
        <p className="text-white mt-5">{userInfo.about}</p>
    </div>)
}