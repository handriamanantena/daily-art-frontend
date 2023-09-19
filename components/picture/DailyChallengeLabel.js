import React from "react";
import {StarSVG} from "../svg/StarSVG";

export const DailyChallengeLabel = ({picture}) => {

    return <div className={`p-0.5 ${picture.dailyChallenge ? "flex" : "hidden"} bg-cyan-500 text-white w-fit rounded self-center content-center`}>
        <StarSVG/>
        <p className="text-xs">Daily</p>
    </div>
};