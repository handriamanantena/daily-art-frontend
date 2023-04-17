import React, {useEffect, useRef, useState} from "react";
import {getAllPictures, getPicture} from "../../common/GetPictures";
import DailyArt from "../dailyart";
import * as path from "path";
import Image from "next/image";
import Gallery from "../../components/Gallery";
import {getNextGallery, getPicturesByPage} from "../../common/api/pictures";
import id from "../../styles/id.module.css"
import styles from "../../styles/Home.module.css";
import {PictureInfo} from "../../components/PictureInfo"

function _Id({ picture, previewGallery }) {

    let host = process.env.REACT_APP_PICTURES_API_HOST + process.env.REACT_APP_PICTURES_API_PORT + '/file/'
    let url = encodeURI(host + picture.url)

    return (<div>
                <div>
                    <div className="flex justify-center">
                        <Image
                            width={picture.width}
                            height={picture.height}
                            src={url}
                            quality={100}/>
                    </div>
                    <PictureInfo picture={picture}></PictureInfo>
                </div>
                <div>
                    <Gallery pictures={previewGallery} key = {0}/>
                </div>
    </div>);

}

export async function setPicturesToParams() {
    let pictures = await getAllPictures()
    console.log("these are the pics" + pictures)
    return pictures.map(picture => {
        return {
                params: {
                    _id: picture._id.replace(/\.md$/, '')
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
    console.log("the id is: " + params._id);
    const picture = await getPicture(params._id)
    const previewGallery = await getPicturesByPage(new Date().toISOString(), 3);
    return {
        props: {
            picture,
            previewGallery
        }
    }
}


export default _Id;