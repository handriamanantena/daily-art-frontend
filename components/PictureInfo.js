import React from "react";
import Moment from 'moment';
import Link from "next/link";
import {ProfilePicture} from "./picture/ProfilePicture";
import {DailyChallengeLabel} from "./picture/DailyChallengeLabel";
import {MAX_NUMBER_CHAR_TO_DISPLAY} from "../common/Constants";


function PictureInfo({userInfo, picture}) {
    console.log(picture.author)
    let date = Moment(picture.date).format('YYYY年 MMM月 D日');

    return (
        <div className="grid md:place-content-center mb-5">
            <div className="mt-3 grow md:max-w-screen-md md:min-w-[768px]">
                <div className="flex flex-row">
                    <div className="hidden md:flex">
                    <Link href={`/dailyart/${encodeURIComponent(picture.userName)}`}>
                        <a className="flex flex-row">
                            <div className="relative h-20 w-20">
                                <ProfilePicture profilePicture={userInfo.profilePicture}/>
                            </div>
                        </a>
                    </Link>
                    </div>
                    <div className="flex flex-col ml-3">
                        <div className="flex flex-row">
                            <h1 className="">{picture.pictureName.substring(0, MAX_NUMBER_CHAR_TO_DISPLAY)}</h1>
                        </div>
                        <div className="hidden md:flex flex-row">
                            <p className="text-slate-500 mr-1 text-lg">Posted by:</p>
                            <Link href={`/dailyart/${encodeURIComponent(picture.userName)}`}>
                                <a className="flex flex-row">
                                    <p className="hover:text-cyan-600 font-bold text-lg">{userInfo.userName}</p>
                                </a>
                            </Link>
                        </div>
                        <div className={`${picture.dailyChallenge ? "flex" : "hidden"} flex-row space-x-1`}>
                            <DailyChallengeLabel picture={picture}/>
                            <p>Challenge : {picture.dailyChallenge}</p>
                        </div>
                    </div>
                    <div className="hidden md:flex grow justify-end">
                        <p className="float-right">{date}</p>
                    </div>
                </div>
            </div>
        </div>);

}

export { PictureInfo }
