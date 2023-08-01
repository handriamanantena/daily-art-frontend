import React from "react";
import Moment from "moment";
import Link from "next/link";
import Image from "next/dist/client/image";

export const BasicPictureInfo = ({picture}) => {
    let date = Moment(picture.date).format('YYYY年 MMM月 D日');

    let profilePic = picture.profile[0]?.profilePicture;
    //src={picture.profile[0]?.profilePicture}
    return <div className="md:hidden flex flex-row w-15 h-10 relative grow mt-5 mb-5">
        <Link href="/dailyart/[userName]" as={`/dailyart/${picture.userName}`}>
            <a className="relative flex flex-row justify-center pt-1 ml-1 w-15 h-15">
                { profilePic ?
                    <div className="relative w-10 h-10">
                <Image className="object-cover grow "
                       layout="fill"
                       src={picture.profile[0]?.profilePicture}
                       unoptimized/>
                    </div> :
                <svg xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 448 512" className="h-10 ml-3 mr-3 pb-1">
                    <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/>
                </svg>}
            </a>
        </Link>
        <div className="grow ml-2">
            <div className="flex">
                <Link href="/picture/[picture]" as={`/picture/${picture._id}`}>
                    <a>
                        <p className="font-bold">{picture.pictureName}</p>
                    </a>
                </Link>
                <h4 className="flex ml-auto mr-2">{date}</h4>
            </div>
            <Link href="/dailyart/[userName]" as={`/dailyart/${picture.userName}`}>
                <a className="flex flex-row">
                    <p>By {picture.userName}</p>
                </a>
            </Link>
        </div>
    </div>

}