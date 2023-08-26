import Image from "next/future/image";
import React, {useContext} from "react";
import AuthContext from "../../common/context/auth-context";

export const ProfilePicture = ({userInfo}) => {

    let ctx = useContext(AuthContext);

    let profilePic = ctx.profilePicture ? ctx.profilePicture : "/placeholder/user-solid.svg";

    return <Image className="rounded-full border-white"
                       src={profilePic}
                       fill={true}
                       unoptimized/>
}