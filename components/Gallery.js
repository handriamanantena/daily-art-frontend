import gallery from '../styles/Gallery.module.scss'
import React, {Fragment, useEffect, useRef, useState} from 'react';
import { ShowPictures } from './ShowPictures'
import {AddPictureButton} from "./button/addpictureButton";

export const Gallery =  ({pictures, setLastElement}) => {

    return (pictures.map((value, index) => {
        return pictures.length - 1 === index ? (
                <div className="flex flex-col w-1/2 sm:w-3/10 lg:w-1/4" key={value._id} ref={setLastElement}><ShowPictures picture={value}/></div>) :
            <div className="flex flex-col w-1/2 sm:w-3/10 lg:w-1/4" key={value._id}><ShowPictures picture={value} /></div>
    }));

}



export default Gallery;
