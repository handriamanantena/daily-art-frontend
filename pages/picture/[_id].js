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
import {ProfilePicture} from "../../components/picture/ProfilePicture";
import Link from "next/link";
import Moment from "moment";

let pageSize = process.env.NEXT_PUBLIC_PAGE_SIZE;

function _Id({ picture, pictures, _id, foundPicture, initialIndex }) {

    console.log("picture" + JSON.stringify(pictures));
    console.log("id" + _id);
    let host = process.env.NEXT_PUBLIC_CDN_IMAGES;
    let url = encodeURI(host + picture?.url)
    let profilePic = picture?.profile[0]?.profilePicture ? picture.profile[0]?.profilePicture : "/placeholder/user-solid.svg";
    let userInfo = { userName: picture?.userName, profilePicture: profilePic};

    let [newPictures, setPictures] = useState(pictures)
    let [isLoading, setIsLoading] = useState(false)
    let [lastElement, setLastElement] = useState(null);
    let [pageIndex, setPageIndex] = useState(initialIndex);
    let [date, setDate] = useState(Moment(picture?.date).format('YYYY年 MMM月 D日'));

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
                <div className="flex flex-col justify-center">
                    <div className="flex mb-2 md:hidden p-2 bg-slate-200">
                        <Link href={`/dailyart/${encodeURIComponent(picture.userName)}`}>
                            <a className="flex">
                                <div className="relative h-16 w-16 md:h-20 md:w-20 self-center">
                                    <ProfilePicture profilePicture={userInfo.profilePicture}/>
                                </div>
                            </a>
                        </Link>
                        <div className="flex flex-col self-center ml-1">
                            <div className="flex flex-row">
                                <Link href={`/dailyart/${encodeURIComponent(picture.userName)}`}>
                                    <a className="flex flex-row">
                                        <p className="hover:text-cyan-600 font-bold text-lg">{userInfo.userName}</p>
                                    </a>
                                </Link>
                            </div>
                            <div className="flex flex-row">
                                <p className="text-slate-500 mr-1 text-sm">Posted on:</p>
                                <p className="text-slate-500 mr-1 text-sm">{date}</p>
                            </div>
                        </div>
                    </div>
                    <div className="grid content-center justify-items-center place-content-center place-items-center grid-cols-1 grid-rows-1">
                        <svg className="absolute w-14 h-14 text-gray-200 dark:text-gray-600 animate-pulse" aria-hidden="true"
                             xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
                        </svg>
                        <Image className="absolute object-contain"
                               src={url}
                               width={1000}
                               height={1000}
                               unoptimized/>
                    </div>
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