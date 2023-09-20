import React from 'react';
import { LinkedPicture } from './LinkedPicture'
import dailyArt from "../styles/DailyArt.module.css";
import {BasicPictureInfo} from "./picture/BasicPictureInfo";

export const Gallery =  ({pictures, setLastElement, isEditable, deletePicture, children}) => {

    return <div className={dailyArt.dailyArt}>
        {children}
        {(pictures?.map((value, index) => {
            return pictures.length - 1 === index ? (
                    <div className="flex flex-col w-full sm:w-3/10 lg:w-1/4" key={value._id} ref={setLastElement}>
                        <BasicPictureInfo picture={value}/>
                        <LinkedPicture picture={value} isEditable={isEditable} deletePicture={deletePicture}/>
                    </div>) :
                <div className="flex flex-col w-full sm:w-3/10 lg:w-1/4" key={value._id}>
                    <BasicPictureInfo picture={value}/>
                    <LinkedPicture picture={value} isEditable={isEditable} deletePicture={deletePicture}/>
                </div>
        }))}
    </div>;

}



export default Gallery;
