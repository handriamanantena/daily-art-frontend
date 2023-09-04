import Image from "next/future/image";
import React from "react";

export const ProfilePicture = ({profilePicture}) => {

    let profilePic = profilePicture ? profilePicture : "/placeholder/user-solid.svg";

    return <Image className="rounded-full border-white"
                       src={profilePic}
                       fill={true}
                       unoptimized/>
}