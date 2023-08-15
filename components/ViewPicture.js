import Image from "next/dist/client/image";
import React, {Fragment, useState} from "react";
import Link from 'next/link'
import {ProfilePicture} from "./picture/ProfilePicture";

export const ViewPicture = ({picture}) => {

    let [hideInfo, setHidePictureInfo] = useState(true);

    let profilePic = picture.profile[0]?.profilePicture ? picture.profile[0]?.profilePicture : "/placeholder/user-solid.svg";
    let userInfo = { userName: picture.userName, profilePicture: profilePic};

    let hidePicInfo = (e) => {
        e.preventDefault();
        setHidePictureInfo(true);
    }

    let showPicInfo = (e) => {
        e.preventDefault();
        setHidePictureInfo(false);
    }
    return (<div className="relative grow h-96">
        <div className="flex items-center justify-center h-96 bg-gray-300 md:rounded-lg dark:bg-gray-700"
             onMouseEnter={showPicInfo}
              onMouseLeave={hidePicInfo}>
            <Image className="object-cover h-full md:rounded-lg grow hover:brightness-50"
                   layout="fill"
                   src={picture.url}
                   objectPosition = "center"
                   unoptimized/>
            <Link href="/picture/[picture]" as={`/picture/${picture._id}`}>
                <a hidden={hideInfo}>
                    <h2 className="absolute top-0 right-0 p-3 text-white">{picture.pictureName}</h2>
                </a>
            </Link>
            <div className="absolute bottom-0 left-0 m-3 h-[30px] w-[30px]" hidden={hideInfo}>
                <Link href={`/dailyart/${encodeURIComponent(userInfo.userName)}`}>
                    <a className="flex flex-row">
                        <ProfilePicture userInfo={userInfo}/>
                        <h3 className="text-white ml-9">{userInfo.userName}</h3>
                    </a>
                </Link>L
            </div>
            <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true"
                 xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
            </svg>
        </div>
        </div>);
};