import {ShowPictures} from "../ShowPictures";
import React from "react";


const Card = (picture) => {

    return (<div className="flex flex-col w-1/2 sm:w-3/10 lg:w-1/4" key={picture.id} >
        <ShowPictures picture={picture}> </ShowPictures>
    </div>)
}