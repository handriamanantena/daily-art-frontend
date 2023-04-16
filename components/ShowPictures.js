import React, {useRef, useState} from "react";
import {CSSTransition} from "react-transition-group";
import gallery from "../styles/Gallery.module.scss";
import Image from "next/image";
import Link from 'next/link'

function ShowPictures({picture}) {
    let host = process.env.REACT_APP_PICTURES_API_HOST + process.env.REACT_APP_PICTURES_API_PORT + '/file/'
    let url = encodeURI(host + picture.url)
    return (
           <Link href="/picture/[picture]" as={`/picture/${picture.id}`}>
            <div className={gallery.card}>
                <a>
                    <Image className={gallery.imageFrame}
                           width={picture.width}
                           height={picture.height}
                           src={url}
                           quality={100}/>
                    <p className={gallery.pictureName}>{picture._id}</p>
                </a>
            </div>
           </Link>);
}

export { ShowPictures }