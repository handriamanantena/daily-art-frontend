import React, {useRef, useState} from "react";
import {CSSTransition} from "react-transition-group";
import gallery from "../styles/Gallery.module.scss";
import Image from "next/image";
import Link from 'next/link'
import cloudflareLoader from "../common/image/imageLoader";

function ShowPictures({picture}) {
    let host = process.env.REACT_APP_CDN_IMAGES;
    let url = encodeURI(host + picture.url)
    return (
           <Link href="/picture/[picture]" as={`/picture/${picture._id}`} loader={cloudflareLoader}>
            <div className={gallery.card}>
                <a>
                    <Image className={gallery.imageFrame}
                           width={picture.width}
                           height={picture.height}
                           src={url}
                           quality={100}
                           loader={cloudflareLoader}/>
                    <p className={gallery.pictureName}>{picture._id}</p>
                </a>
            </div>
           </Link>);
}

export { ShowPictures }