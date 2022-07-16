import gallery from '../styles/Gallery.module.scss'
import React, {useEffect, useRef, useState} from 'react';
import { ShowPictures } from './ShowPictures'

class Gallery extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return this.props.pictures.map((value, index) => {
                    return <div class="flex flex-col w-1/2 sm:w-3/10 lg:w-1/4" key={value.id} >
                        <ShowPictures picture={value}> </ShowPictures>
                    </div>
                })
        ;
    }


}

/*function ShowPictures({picture}) {
    let host = 'http://192.168.0.130:3001/file/'
    let url = encodeURI(host + picture.url)
    const nodeRef = React.useRef(null)
    const [zoomPic, setIsZoomPic] = useState(false);

    let image = useRef()

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
                           quality={100}/>
                    <p className={gallery.pictureName}>{picture.pictureName}</p>
                </a>
            </div>
        </CSSTransition>);
}*/


export default Gallery;
