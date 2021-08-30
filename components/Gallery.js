import styles from '../styles/Home.module.css'
import gallery from '../styles/Gallery.module.css'
import React from 'react';
import Image from 'next/image'


class Gallery extends React.Component {
    constructor(props) {
        super(props);
       // this.state = {
        this.photo  = [  "/img.png",
            "/img.png",
            "/img.png",
            "/img.png",
            "/img.png",
            "/img.png",
            "/img.png",
            "/img.png",
            "/img.png",
            "/img.png",
            "/img.png",
            "/img.png"];
       // }
    }
    render() {
        return (
            <div className={ gallery.gallery }>
                { this.photo.map((value, index) => {
                    return <div className={[gallery.frame]} key={index} >
                        <a className={gallery.card}>
                            <Image className={gallery.imageFrame}
                                   width={1035}
                                   height={1228}
                                   src={this.photo[index]}/>
                        </a>
                    </div>
                })
                }
            </div>
        );
    }
}

class Frame extends React.Component {

}

export default Gallery;
