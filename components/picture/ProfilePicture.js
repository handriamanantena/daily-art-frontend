import Link from "next/link";
import Image from "next/future/image";
import React from "react";

export const ProfilePicture = ({userInfo}) => {

    let profilePic = userInfo?.profilePicture ? userInfo.profilePicture : "/placeholder/user-solid.svg";

    return <Link href="/dailyart/[userName]" as={`/dailyart/${userInfo.userName}`}>
            <a className="flex flex-row">
                <Image className="rounded-full"
                       src={profilePic}
                       fill={true}
                       unoptimized/>
                <h3 className="text-white ml-9">{userInfo.userName}</h3>
            </a>
        </Link>
}