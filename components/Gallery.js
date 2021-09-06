import gallery from '../styles/Gallery.module.css'
import React from 'react';
import Image from 'next/image'


class Gallery extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={ gallery.gallery } key='random'>
                { this.props.pictures.map((value, index) => {
                    return <div className={[gallery.frame]} key={value.url} >
                        <a className={gallery.card} key={value.url}>
                            <Image className={gallery.imageFrame}
                                   width={1035}
                                   height={1228}
                                   src={value.url}
                                   key={value.url}/>
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
