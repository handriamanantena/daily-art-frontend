import React, {useRef, useState} from "react";
import {CSSTransition} from "react-transition-group";
import gallery from "../styles/Gallery.module.scss";
import Image from "next/image";


function ShowPictures({picture}) {
    let host = process.env.REACT_APP_PICTURES_API_HOST + process.env.REACT_APP_PICTURES_API_PORT + '/file/'
    let url = encodeURI(host + picture.url)
    const nodeRef = React.useRef(null)
    /*let [pictureSizeCss, setPictureSizeCss] = useState(gallery.card)
    let [growPicture, setGrowPicture] = useState()*/
    const [zoomPic, setIsZoomPic] = useState(false);

    let image = useRef()
    /*useEffect(() => {
        window.addEventListener( "click", onClick)
        return () => {
            window.removeEventListener("click", onClick)
        }
    })*/

    let clickPicture = () => {
        setIsZoomPic(true)
        console.log('change grow')
    }

    return (
        <CSSTransition nodeRef={nodeRef} in={zoomPic} timeout={200} classNames={{
            enterActive: gallery.alertEnterActive,
            enterDone: gallery.alertEnterDone,
            exitActive: gallery.alertExitActive
        }} >
            <div ref={nodeRef} className={gallery.card} onClick={() => clickPicture()}>
                <a key={picture.id}>
                    <Image className={gallery.imageFrame}
                           width={picture.width}
                           height={picture.height}
                           src={url}
                           key={picture.id}
                           quality={100}
                           unoptimized/>
                    <p className={gallery.pictureName}>{picture.pictureName}</p>
                </a>
            </div>
        </CSSTransition>);
}