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
                <a key={picture.id}>
                    <Image className={gallery.imageFrame}
                           width={picture.width}
                           height={picture.height}
                           src={url}
                           key={picture.id}
                           quality={100}/>
                    <p className={gallery.pictureName}>{picture.pictureName}</p>
                </a>
            </div>
           </Link>);
}

export { ShowPictures }