import React, {useEffect, useRef, useState} from "react";
import {getAllPictures, getPicture} from "../../common/GetPictures";
import DailyArt from "../dailyart";
import * as path from "path";
import Image from "next/image";
import Gallery from "../../components/Gallery";
import {getNextGallery, getPicturesByArtistUserName, getPicturesByPage} from "../../common/api/pictures";
import {PictureInfo} from "../../components/PictureInfo"
import {BasicLayout} from "../../components/common/BasicLayout";
import {InfiniteScroll} from "../../components/InfiniteScroll";

let pageSize = 2;

function _Id({ picture, pictures, _id }) {

    let host = process.env.REACT_APP_PICTURES_API_HOST + process.env.REACT_APP_PICTURES_API_PORT + '/file/'
    let url = encodeURI(host + picture.url)

    let [newPictures, setPictures] = useState(pictures)
    let [isLoading, setIsLoading] = useState(false)
    let [lastElement, setLastElement] = useState(null);
    let [pageIndex, setPageIndex] = useState(pictures[pictures.length - 1]._id);

    let getPictures = async () => {
        setIsLoading(true)
        let response = await getPicturesByPage(null, pageSize, pageIndex);
        if(response.length > 0) {
            setPageIndex(response[response.length-1]._id);
            pictures.push(...response);
            setPictures(pictures)
            setIsLoading(false)
        }
    }

    return (
        <BasicLayout>
            <div>
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
                <InfiniteScroll getObjects = {getPictures} maxPage = {10} lastElement={lastElement}>
                    <Gallery pictures = {newPictures} setLastElement = {setLastElement}/>
                </InfiniteScroll>
            </div>
        </BasicLayout>
      );

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

export async function getStaticProps(context) {
    const { params } = context;
    const _id = params._id;
    const picture = await getPicture(params._id)
    const pictures =  await getPicturesByPage(null, pageSize, null);
    return {
        props: {
            picture,
            pictures : pictures,
            _id : _id
        }
    }
}


export default _Id;