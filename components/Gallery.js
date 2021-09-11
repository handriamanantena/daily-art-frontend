import gallery from '../styles/Gallery.module.css'
import React from 'react';
import Image from 'next/image'


class Gallery extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let host = 'http://192.168.0.130:3001/file/'
        return this.props.pictures.map((value, index) => {
                    let url = encodeURI(host + value.url)
                    return <div className={[gallery.frame]} key={value._id} >
                        <a className={gallery.card} key={value._id}>
                            <Image className={gallery.imageFrame}
                                   width={1035}
                                   height={1228}
                                   src={url}
                                   key={value._id}/>
                        </a>
                    </div>
                })

        ;
    }
}

class Frame extends React.Component {

}

export default Gallery;
