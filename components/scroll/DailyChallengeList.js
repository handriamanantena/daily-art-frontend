import React from "react";
import {DailyChallengeLink} from "../Link/DailyChallengeLink";

export const DailyChallengeList =  ({challenges, setLastElement, children}) => {

    return <div>
        {children}
        {(challenges?.map((dailyChallenge, index) => {
            return challenges.length - 1 === index ? (
                    <div className="w-full" key={dailyChallenge._id} ref={setLastElement}>
                       <DailyChallengeLink dailyChallenge={dailyChallenge}/>
                    </div>) :
                <div className="w-full" key={dailyChallenge._id}>
                    <DailyChallengeLink dailyChallenge={dailyChallenge}/>
                </div>
        }))}
    </div>;
}


export default DailyChallengeList;