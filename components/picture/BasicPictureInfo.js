import React from "react";
import {UserBasicPictureInfo} from "./UserBasicPictureInfo";
import {ChallengeBasicInfo} from "./ChallengeBasicInfo";

export const BasicPictureInfo = ({picture}) => {

    if(picture.pictureName) {
        return <UserBasicPictureInfo picture={picture}/>
    }
    else {
        return <ChallengeBasicInfo challenge={picture}/>
    }

}