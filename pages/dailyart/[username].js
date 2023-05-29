import Gallery from "../../components/Gallery";
import React, {useState, useRef} from 'react';
import dailyArt from '../../styles/DailyArt.module.css';
import {BasicLayout} from "../../components/common/BasicLayout";
import {getArtistUserNames} from "../../common/api/artists";
import {getPicturesByArtistUserName} from "../../common/api/pictures";
import {InfiniteScroll} from "../../components/InfiniteScroll"

let pageSize = 2;

function Username({ username, pictures }) {
    let [newPictures, setPictures] = useState(pictures)
    let [isLoading, setIsLoading] = useState(false)
    let [lastElement, setLastElement] = useState(null);
    let [pageIndex, setPageIndex] = useState(pictures[pictures.length - 1]._id);

    let getPictures = async () => {
        setIsLoading(true)
        let response = await getPicturesByArtistUserName(username, pageSize, pageIndex);
        if(response.length > 0) {
            setPageIndex(response[response.length-1]._id);
            pictures.push(...response);
            setPictures(pictures)
            setIsLoading(false)
        }
    }

   return (<BasicLayout>
            <h1 className={ dailyArt.simpleArtTitle }>Simple Art</h1>
                <InfiniteScroll getObjects = {getPictures} maxPage = {10} lastElement = {lastElement}>
                    <Gallery pictures = {newPictures} setLastElement = {setLastElement}/>
                </InfiniteScroll>
         </BasicLayout>);

}

export async function setUserNamesToParams() {
    let usernames = await getArtistUserNames()
    return usernames.map(username => {
        return {
            params: {
                username: username
            }
        }
    })
}

export async function getStaticPaths() {
    let paths = await setUserNamesToParams();
    console.log(paths);
    return {
        paths: paths,
        fallback: false, // can also be true or 'blocking'
    }
}


export async function getStaticProps(context) {
    const { params } = context;
    const username = params.username;
    const pictures = await getPicturesByArtistUserName(username, pageSize, 0);
    return {
        props: {
            pictures : pictures,
            username: username
        }
    }
}


export default Username;