import React, {useEffect, useRef, useState} from "react";
import {getAllPictures} from "../../common/GetPictures";
import Image from "next/image";
import Gallery from "../../components/Gallery";
import {
    createPicturePath,
    getPicturesByArtistUserName,
    getPictureWithProfilePicture,
    getPictureIdFromPath
} from "../../common/api/pictures";
import {PictureInfo} from "../../components/PictureInfo"
import {BasicLayout} from "../../components/common/BasicLayout";
import {InfiniteScroll} from "../../components/InfiniteScroll";
import { useRouter } from 'next/router'
import {LoadingScreen} from "../../components/loading/LoadingScreen";

let pageSize = process.env.NEXT_PUBLIC_PAGE_SIZE;

function _Id({ picture, pictures, _id, foundPicture, initialIndex }) {

    let host = process.env.NEXT_PUBLIC_CDN_IMAGES;
    let url = encodeURI(host + picture?.url)
    let profilePic = picture?.profile[0]?.profilePicture ? picture.profile[0]?.profilePicture : "/placeholder/user-solid.svg";
    let userInfo = { userName: picture?.userName, profilePicture: profilePic};

    let [newPictures, setPictures] = useState(pictures)
    let [isLoading, setIsLoading] = useState(false)
    let [lastElement, setLastElement] = useState(null);
    let [pageIndex, setPageIndex] = useState(initialIndex);

    let getPictures = async () => {
        setIsLoading(true)
        let response = await getPicturesByArtistUserName(picture.userName, pageSize, pageIndex);

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
        return <LoadingScreen isLoadingHidden={false}><p className="text-black">Loading...</p></LoadingScreen>
    }

    return (
        <BasicLayout>
            <div className="mt-5">
                <div className="relative h-[300px] md:h-[1000px]">
                    <Image className="object-contain"
                           src={url}
                           layout="fill"
                           unoptimized/>
                </div>
                <PictureInfo picture={picture} userInfo={userInfo}></PictureInfo>
                <InfiniteScroll getObjects = {getPictures} maxPage = {100} lastElement={lastElement}>
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
    return pictures.map(picture => {
        return {
                params: {
                    _id: createPicturePath(picture)
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

export async function getStaticProps({params}) {
    const _id = getPictureIdFromPath(params._id);
    console.log("this is the path id: " + _id);
    const picture = await getPictureWithProfilePicture(_id) // TODO need to add a filter on id. right now it returns all ids less than id
    if(picture == undefined || picture.length == 0) {
        return {
            notFound: true
        };
    }
    const pictures = await getPicturesByArtistUserName(picture.userName, pageSize, 0);
    const initialIndex = pictures ? pictures[pictures.length -1]._id : undefined
    let foundPicture = { foundPicture : false };
    let filteredPictures = filterPicture(pictures, _id, foundPicture);
    return {
        props: {
            picture,
            pictures : filteredPictures,
            _id : _id,
            foundPicture : foundPicture,
            initialIndex
        },
        revalidate: +(process.env.NEXT_PUBLIC_REVALIDATE_SEC)
    }
}


export default _Id;