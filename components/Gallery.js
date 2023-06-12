import React from 'react';
import { ShowPictures } from './ShowPictures'
import dailyArt from "../styles/DailyArt.module.css";

export const Gallery =  ({pictures, setLastElement, children}) => {

    return <div className={dailyArt.dailyArt}>
        {children}
        {(pictures.map((value, index) => {
            return pictures.length - 1 === index ? (
                    <div className="flex flex-col w-1/2 sm:w-3/10 lg:w-1/4" key={value._id} ref={setLastElement}>
                        <ShowPictures
                            picture={value}/></div>) :
                <div className="flex flex-col w-1/2 sm:w-3/10 lg:w-1/4" key={value._id}><ShowPictures picture={value}/>
                </div>
        }))}
    </div>;

}



export default Gallery;
