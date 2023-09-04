import React, {Fragment, useContext} from "react";
import AuthContext from "../../common/context/auth-context";
import {EditButton} from "../button/EditButton";

export const About = ({userInfo}) => {

    const ctx = useContext(AuthContext);
    return (<Fragment>
            <div className="bg-black m-10 p-10">
                <div className="md:flex">
                    <h1 className="text-white whitespace-normal">{userInfo.userName}</h1>
                    {ctx.isAuthorized(userInfo.userName) ?
                        <EditButton userInfo={userInfo}/> : <></>}
                </div>
                <p className="text-white mt-5">{userInfo.about}</p>
            </div>
        </Fragment>)
}