import Link from "next/link";
import {MAX_NUMBER_CHAR_TO_DISPLAY} from "../../common/Constants";
import React from "react";
import Moment from "moment";

export const ChallengeBasicInfo = ({challenge}) => {
    let date = Moment(challenge.date).format('YYYY年 MMM月 D日');
    return <div className="md:hidden flex flex-row w-15 h-10 relative grow mt-5 mb-5">
        <div className="grow ml-2">
            <div className="flex">
                <Link href={`/challenge/${challenge.english}`}>
                    <a>
                        <p className="font-bold">{challenge.english.substring(0, MAX_NUMBER_CHAR_TO_DISPLAY)}</p>
                    </a>
                </Link>
                <h4 className="flex ml-auto mr-2">{date}</h4>
            </div>
        </div>
    </div>
};