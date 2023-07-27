import React, {useEffect, useState} from "react";
import gallery from "../styles/Gallery.module.scss";
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
    }, []);
    return (
           <Link href="/picture/[picture]" as={`/picture/${picture._id}`}>
            <div className={gallery.card}>
                <a>
                    <ViewPicture picture = {picture}/>
                </a>
            </div>
           </Link>);
}

export { LinkedPicture }