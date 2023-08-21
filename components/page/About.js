import React from "react";

export const About = ({userInfo}) => {


    return <div className="bg-black m-10 p-10">
        <h1 className="text-white whitespace-normal">{userInfo.userName}</h1>
        <p className="text-white mt-5">{userInfo.about}</p>
    </div>
}