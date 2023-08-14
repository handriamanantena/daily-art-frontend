import Link from "next/link";
import Image from "next/future/image";
import React from "react";

export const ProfilePicture = ({userInfo}) => {

    let profilePic = userInfo?.profilePicture ? userInfo.profilePicture : "/placeholder/user-solid.svg";

    return <Image className="rounded-full border-white"
                       src={profilePic}
                       fill={true}
                       unoptimized/>
}