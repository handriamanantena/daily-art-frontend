import React from "react";
import {DailyChallengeLink} from "../Link/DailyChallengeLink";

export const DailyChallengeList =  ({challenges, setLastElement, children}) => {

    console.log(JSON.stringify(challenges));
    return <div>
        {children}
        {(challenges?.map((dailyChallenge, index) => {
            return dailyChallenge.length - 1 === index ? (
                    <div className="flex flex-col w-full sm:w-3/10 lg:w-1/4" key={dailyChallenge._id} ref={setLastElement}>
                       <DailyChallengeLink dailyChallenge={dailyChallenge}/>
                    </div>) :
                <div className="flex flex-col w-full sm:w-3/10 lg:w-1/4" key={dailyChallenge._id}>
                    <DailyChallengeLink dailyChallenge={dailyChallenge}/>
                </div>
        }))}
    </div>;
}
