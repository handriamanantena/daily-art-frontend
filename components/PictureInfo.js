import Image from "next/image";
import React from "react";
import Moment from 'moment';
import Link from "next/link";
import {ProfilePicture} from "./picture/ProfilePicture";


function PictureInfo({userInfo, picture}) {
    console.log(picture.author)
    let date = Moment(picture.date).format('d MMM')
    return (
        <div className="grid place-content-center mb-5">
            <div className="mt-3">
                <div className="flex flex-row">
                    <Link href={`/dailyart/${encodeURIComponent(picture.userName)}`}>
                        <a className="flex flex-row">
                            <div className="relative h-20 w-20">
                                <ProfilePicture userInfo={userInfo}/>
                            </div>
                        </a>
                    </Link>
                    <div className="flex flex-col ml-3">
                        <h1 className="">{picture.pictureName}</h1>
                        <div className="flex flex-row">
                            <p className="text-slate-500 mr-1 text-lg">Posted by:</p>
                            <Link href={`/dailyart/${encodeURIComponent(picture.userName)}`}>
                                <a className="flex flex-row">
                                    <p className="hover:text-cyan-600 font-bold text-lg">{userInfo.userName}</p>
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="ml-[10px] md:max-w-screen-md md:min-w-[768px]">
            <div className="flex flex-row">
                <button className="flex flex-row pt-[10px]">
                    <p className="mr-[5px]">6</p>
                    <Image src="/icons/chat.svg" alt="Comment" width={24} height={24} unoptimized/>
                    <p className="text-[0px] md:text-[16px] md:visible ml-[5px]">Comment</p>
                </button>
                <div className="flex flex-row-reverse grow">
                    <button disabled={true} className="flex flex-row pt-[10px]">
                        <p className="text-[0px] md:text-[16px] mr-[5px]">Views</p>
                        <Image src="/icons/eye-fill.svg" width={24} height={24} unoptimized/>
                    </button>
                    <button className="pr-[5px] pt-[10px]">
                        <Image src="/icons/trophy-fill.svg" alt="Award" width={24} height={24} unoptimized/>
                    </button>
                </div>
            </div>
            <div>
                <p className="text-sm">{date}</p>
            </div>
            <form className="flex flex-col">
                <label>Comments</label>
                <textarea className="ml-10 h-[80px] bg-slate-200 mw-80"/>
            </form>
        </div>
        </div>);

}

export { PictureInfo }
