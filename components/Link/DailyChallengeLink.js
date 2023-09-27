import React from "react";
import {formatDateJapanease} from "../../common/Utility";
import Link from 'next/link'
import Image from "next/dist/client/image";
import {createPicturePath} from "../../common/api/pictures";

export const DailyChallengeLink = ({dailyChallenge}) => {

    return <div className="flex flex-row hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-500 border-t border-x border-black w-full grow">
        <Link href={`/challenge/${encodeURIComponent(dailyChallenge.english)}`}>
            <a className="w-fit">
                <div className="flex flex-col group w-fit p-5 leading-none grow">
                    <h2 className="border-r-1 w-full leading-none group-hover:text-white break-keep">{dailyChallenge.english}/{dailyChallenge.japanese}</h2>
                    <p className="text-sm tracking-tighter text-slate-950 leading-none">{formatDateJapanease(dailyChallenge.date)}</p>
                </div>
            </a>
        </Link>
        <div className="flex w-fit grow z-10">
            {(dailyChallenge?.pictures.map((picture, index) => {
                if(index > 8) {
                    return <></>
                }
                return <Link href={`/picture/${createPicturePath(picture)}`} key={"challenge" + picture._id}>
                    <a>
                        <div className={`relative flex w-14 h-14 m-2 ${index > 2 ? `hidden md:flex` : `flex`}`}>
                            <Image className=" md:rounded-lg grow rounded-lg"
                                   layout="fill"
                                   src={encodeURI(process.env.NEXT_PUBLIC_CDN_IMAGES + picture.url)}
                            />
                        </div>
                    </a>
                </Link>
            }))}
        </div>
    </div>
}