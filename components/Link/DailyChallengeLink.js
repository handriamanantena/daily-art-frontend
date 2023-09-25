import React from "react";
import {formatDateJapanease} from "../../common/Utility";
import Link from 'next/link'

export const DailyChallengeLink = ({dailyChallenge, pictures}) => {

    return <Link href={`/dailyart`}>
        <a>
            <div
                className="flex flex-col group w-full p-5 bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-500 leading-none border-t border-x border-black">
                <h2 className="border-r-1 w-full leading-none group-hover:text-white">{dailyChallenge.english}/{dailyChallenge.japanese}</h2>
                <p className="text-sm tracking-tighter text-slate-950	 leading-none">{formatDateJapanease(dailyChallenge.date)}</p>
            </div>
        </a>
    </Link>
}