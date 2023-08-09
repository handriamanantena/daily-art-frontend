import Link from "next/link";
import Image from "next/future/image";
import React from "react";

export const ProfilePicture = ({userInfo}) => {

    let profilePic = userInfo?.profilePicture ? userInfo.profilePicture : "/placeholder/user-solid.svg";

    return <Link href="/dailyart/[userName]" as={`/dailyart/${userInfo.userName}`}>
            <a className="flex flex-row">
                <Image className="object-cover h-full rounded-full"
                       width={30}
                       height={30}
                       src={profilePic}
                       unoptimized/>
                <h3 className="text-white ml-3">{userInfo.userName}</h3>
            </a>
        </Link>
}