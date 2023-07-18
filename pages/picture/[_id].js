import React, {useEffect, useRef, useState} from "react";
import {getAllPictures, getPicture} from "../../common/GetPictures";
import Image from "next/image";
import Gallery from "../../components/Gallery";
import {getNextGallery, getPicturesByArtistUserName, getPicturesByPage} from "../../common/api/pictures";
import {PictureInfo} from "../../components/PictureInfo"
import {BasicLayout} from "../../components/common/BasicLayout";
import {InfiniteScroll} from "../../components/InfiniteScroll";
import { useRouter } from 'next/router'

let pageSize = 2;

function _Id({ picture, pictures, _id, foundPicture, initialIndex }) {

    let host = process.env.NEXT_PUBLIC_CDN_IMAGES;
    let url = encodeURI(host + picture?.url)

    let [newPictures, setPictures] = useState(pictures)
    let [isLoading, setIsLoading] = useState(false)
    let [lastElement, setLastElement] = useState(null);
    let [pageIndex, setPageIndex] = useState(initialIndex);

    let getPictures = async () => {
        setIsLoading(true)
        let response = await getPicturesByPage(null, pageSize, pageIndex);

        if(response.length > 0) {
            let filteredResponse = filterPicture(response, _id, foundPicture);
            setPageIndex(response[response.length-1]._id);
            pictures.push(...filteredResponse);
            setPictures(pictures)
            setIsLoading(false)
        }
    }

    const router = useRouter()

    // If the page is not yet generated, this will be displayed
    // initially until getStaticProps() finishes running
    if (router.isFallback) {
        return <div>Loading...</div>
    }

    return (
        <BasicLayout>
            <div>
                <div>
                        <div className="relative h-[1000px]">
                            <Image className="object-contain rounded-lg h-[1000px]"
                                   src={url}
                                   layout="fill"
                                   unoptimized/>
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

let filterPicture = (response, _id, foundPicture) => {
    let filteredResponse = [];
    if(!foundPicture.foundPicture) {
        filteredResponse = response.filter(picture => {
            if(picture._id == _id) {
                foundPicture.foundPicture = true;
                return false;
            }
            return true;
        });
        return filteredResponse;
    }
    else {
        return response;
    }
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
        fallback: true
    }
}

export async function getStaticProps(context) {
    const { params } = context;
    const _id = params._id;
    const picture = await getPicture(params._id)
    const pictures =  await getPicturesByPage(null, pageSize, null);
    const initialIndex = pictures[pictures.length -1]._id
    let foundPicture = { foundPicture : false };
    let filteredPictures = filterPicture(pictures, _id, foundPicture);
    console.log("_id initial " + JSON.stringify(filteredPictures));
    return {
        props: {
            picture,
            pictures : filteredPictures,
            _id : _id,
            foundPicture : foundPicture,
            initialIndex
        }
    }
}


export default _Id;