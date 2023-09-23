import React from "react";
import {formatDateJapanease} from "../../common/Utility";

export const DailyChallengeLink = ({dailyChallenge, pictures}) => {

    return <div className="flex flex-row">
        <h2 className="border-r-1 p-1">{dailyChallenge.english}/{dailyChallenge.japanese}</h2>
        <h2 className="border-r-1 p-1">{formatDateJapanease(dailyChallenge.date)}</h2>
    </div>
}