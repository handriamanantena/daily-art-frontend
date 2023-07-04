import React, {useEffect, useState} from "react";
import gallery from "../styles/Gallery.module.scss";
import Link from 'next/link'
import {ViewPicture} from "./ViewPicture";

function LinkedPicture({picture}) {
    let host = process.env.REACT_APP_CDN_IMAGES;
    let url = encodeURI(host + picture.url)
    return (
           <Link href="/picture/[picture]" as={`/picture/${picture._id}`}>
            <div className={gallery.card}>
                <a>
                    <ViewPicture url = {url}/>
                </a>
            </div>
           </Link>);
}

export { LinkedPicture }