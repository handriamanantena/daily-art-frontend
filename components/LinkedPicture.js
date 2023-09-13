import React, {useEffect} from "react";
import {ViewPicture} from "./ViewPicture";

function LinkedPicture({picture, isEditable, deletePicture}) {
    let host = process.env.NEXT_PUBLIC_CDN_IMAGES;
    let url = encodeURI(host + picture.url)

    useEffect(() => {
        if(picture.url.startsWith("http") || picture.url.startsWith("https")) {
            return;
        }
        else {
            picture.url = url;
        }
    }, [picture]);
    return (<ViewPicture picture = {picture} isEditable={isEditable} deletePicture={deletePicture}/>);
}

export { LinkedPicture }