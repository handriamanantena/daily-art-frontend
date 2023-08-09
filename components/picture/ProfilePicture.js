import Link from "next/link";
import Image from "next/future/image";
import React from "react";

export const ProfilePicture = ({userInfo, children}) => {

    let profilePic = userInfo?.profilePicture ? userInfo.profilePicture : "/placeholder/user-solid.svg";

    return <Link href={`/dailyart/${encodeURIComponent(userInfo.userName)}`}>
            <a className="flex flex-row">
                <Image className="rounded-full"
                       src={profilePic}
                       fill={true}
                       unoptimized/>
                {children}
            </a>
        </Link>
}