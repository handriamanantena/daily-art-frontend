import gallery from '../styles/Gallery.module.css'
import React from 'react';
import Image from 'next/image'


class Gallery extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className={ gallery.gallery }>
                { this.props.pictures.map((value, index) => {
                    console.log(value)
                    return <div className={[gallery.frame]} key={value} >
                        <a className={gallery.card}>
                            <Image className={gallery.imageFrame}
                                   width={1035}
                                   height={1228}
                                   src={value.url}/>
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
