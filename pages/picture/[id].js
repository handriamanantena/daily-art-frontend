import React, {useEffect, useRef, useState} from "react";
import {getAllPictures, getPicture} from "../../common/GetPictures";
import DailyArt from "../dailyart";
import * as path from "path";


function Id({ picture }) {

    return (<div>
        { JSON.stringify(picture) }
    </div>);

}

export async function setPicturesToParams() {
    let pictures = await getAllPictures()
    return pictures.map(picture => {
        return {
                params: {
                    id: picture.id.replace(/\.md$/, '')
                }
        }
    })
}


/*export async function getStaticPaths() {
    // Return a list of possible value for id
}*/

export async function getStaticPaths() {
    const paths = await setPicturesToParams()
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps( { params }) {
    const picture = await getPicture(params.id)
    console.log(picture)
    return {
        props: {
            picture
        }
    }
}


export default Id;