
import React from "react";
import {ViewPicture} from "../ViewPicture";
import {ViewChallengePicture} from "./ViewChallengePicture";

export const ImageComponent = ({picture, isEditable, deletePicture}) => {

    if(picture.pictureName) {
        return <ViewPicture picture={picture} isEditable={isEditable} deletePicture={deletePicture}/>
    }
    else {
        return <ViewChallengePicture challenge={picture}/>
    }
};