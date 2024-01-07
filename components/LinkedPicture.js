import React, {useEffect} from "react";
import {ImageComponent} from "./picture/ImageComponent";

function LinkedPicture({picture, isEditable, deletePicture}) {
    let host = process.env.NEXT_PUBLIC_CDN_IMAGES;
    let url = encodeURI(host + picture.url)

    useEffect(() => {
        if(picture.pictureName) {
            if(picture.url.startsWith("http") || picture.url.startsWith("https")) {
                return;
            }
            else {
                picture.url = url;
            }
        }

    }, [picture]);
    return (<ImageComponent picture = {picture} isEditable={isEditable} deletePicture={deletePicture}/>);
}

export { LinkedPicture }