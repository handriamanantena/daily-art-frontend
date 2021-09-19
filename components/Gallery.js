import gallery from '../styles/Gallery.module.css'
import React, {useState} from 'react';
import Image from 'next/image'


class Gallery extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return this.props.pictures.map((value, index) => {
                    return <div className={[gallery.frame]} key={value._id} >
                        <ShowPictures picture={value}> </ShowPictures>
                    </div>
                })

        ;
    }


}

function ShowPictures({picture}) {
    let host = 'http://192.168.0.130:3001/file/'
    let url = encodeURI(host + picture.url)
    return  (<a className={gallery.card} key={picture._id}>
        <Image className={gallery.imageFrame}
               width={1035}
               height={1228}
               src={url}
               key={picture._id}
               quality={100}/>
        <p className={ gallery.pictureName}>{picture.pictureName}</p>
    </a>);
}


export default Gallery;
