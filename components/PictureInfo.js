import Image from "next/image";
import React from "react";
import Moment from 'moment';
import Link from "next/link";
import {ProfilePicture} from "./picture/ProfilePicture";
import {CommentSection} from "./input/CommentSection";


function PictureInfo({userInfo, picture}) {
    console.log(picture.author)
    let date = Moment(picture.date).format('YYYY年 MMM月 D日');

    return (
        <div className="grid place-content-center mb-5">
            <div className="mt-3 grow md:max-w-screen-md md:min-w-[768px]">
                <div className="flex flex-row">
                    <Link href={`/dailyart/${encodeURIComponent(picture.userName)}`}>
                        <a className="flex flex-row">
                            <div className="relative h-20 w-20">
                                <ProfilePicture userInfo={userInfo.profilePicture}/>
                            </div>
                        </a>
                    </Link>
                    <div className="flex flex-col ml-3">
                        <div className="flex flex-row">
                            <h1 className="">{picture.pictureName}</h1>
                        </div>
                        <div className="flex flex-row">
                            <p className="text-slate-500 mr-1 text-lg">Posted by:</p>
                            <Link href={`/dailyart/${encodeURIComponent(picture.userName)}`}>
                                <a className="flex flex-row">
                                    <p className="hover:text-cyan-600 font-bold text-lg">{userInfo.userName}</p>
                                </a>
                            </Link>
                        </div>
                    </div>
                    <div className="grow">
                        <p className="float-right">{date}</p>
                    </div>
                </div>
            </div>
        </div>);

}

export { PictureInfo }
