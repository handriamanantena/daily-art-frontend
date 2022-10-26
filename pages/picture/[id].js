import React, {useEffect, useRef, useState} from "react";
import {getAllPictures, getPicture} from "../../common/GetPictures";
import DailyArt from "../dailyart";
import * as path from "path";
import Image from "next/image";
import Gallery from "../../components/Gallery";
import { getNextGallery } from "../../common/api/pictures";
import id from "../../styles/id.module.css"
import styles from "../../styles/Home.module.css";
import {PictureInfo} from "../../components/PictureInfo"

function Id({ picture, previewGallery }) {

    let host = process.env.REACT_APP_PICTURES_API_HOST + process.env.REACT_APP_PICTURES_API_PORT + '/file/'
    let url = encodeURI(host + picture.url)

    return (<div>
                <div>
                    <div className="flex justify-center">
                        <Image
                            width={picture.width}
                            height={picture.height}
                            src={url}
                            key={picture.id}
                            quality={100}/>
                    </div>
                    <PictureInfo picture={picture}></PictureInfo>
                </div>
                <div>
                    <Gallery pictures={previewGallery.pictures} key = {0}/>
                </div>
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
    const previewGallery = await getNextGallery(0)
    console.log(picture)
    return {
        props: {
            picture,
            previewGallery
        }
    }
}


export default Id;