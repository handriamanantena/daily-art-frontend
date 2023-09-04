import React, {useEffect, useState} from "react";
import Link from 'next/link'
import {ViewPicture} from "./ViewPicture";

function LinkedPicture({picture}) {
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
    return (
           <Link href={`/picture/${picture._id}`}>
            <div className="md:ml-1 md:mr-1 mt-1 mb-1 z-49">
                <a>
                    <ViewPicture picture = {picture}/>
                </a>
            </div>
           </Link>);
}

export { LinkedPicture }