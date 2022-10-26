import React, { useState } from 'react';
import Gallery from "./Gallery";


const InfiniteGalleryLoad = props => {
    const [galleryList, setGalleryList] = useState(props.galleries);

    return ((galleryList.map((gallery) =>
        <Gallery pictures = {gallery.pictures} key = {gallery.page}/>
    )));


}

