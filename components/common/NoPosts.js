import {PicturePlaceHolder} from "../svg/PicturePlaceHolder";
import React, {useEffect, useState} from "react";

export const NoPosts = ({pictures, text}) => {

    let [noPostsText, setText] = useState(text ? text : "No posts yet");

    if(pictures == undefined || pictures.length === 0) {
        return <div className="flex flex-col justify-center items-center h-screen ">
            <div className="animate-pulse mt-5">
                <PicturePlaceHolder height={300} width={300}/>
            </div>
            <h1 className="text-gray-300">{noPostsText}</h1>
        </div>
    }
    return <></>;
}