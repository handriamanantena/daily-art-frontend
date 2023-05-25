import Gallery from "../../components/Gallery";
import React, {useEffect, useState, useRef} from 'react';
import dailyArt from '../../styles/DailyArt.module.css';
import {BasicLayout} from "../../components/common/BasicLayout";
import {getArtistUserNames} from "../../common/api/artists";
import {getPicturesByArtistUserName} from "../../common/api/pictures";
import {InfiniteScroll} from "../../components/InfiniteScroll"

let pageSize = 2;

function Username({ username, pictures, firstPageIndex }) {
    const divRef = useRef()
    let [newPictures, setPictures] = useState(pictures)
    let [isLoading, setIsLoading] = useState(false)
    let [lastElement, setLastElement] = useState(null);
    let [pageIndex, setPageIndex] = useState(firstPageIndex);

    let getPictures = async () => {
        setIsLoading(true)
        let response = await getPicturesByArtistUserName(username, pageSize, pageIndex);
        console.log("outside getPictures index " + pageIndex);
        if(response.length > 0) {
            setPageIndex(response[response.length-1]._id);
            console.log("inside getPictures index " + pageIndex);
            pictures.push(...response);
            setPictures(pictures)
            setIsLoading(false)
        }
    }

    let checkIsMaxPage = () => {

    }

    /* useEffect(() => {
         window.addEventListener("scroll", handleScroll)
         return () => {
             window.removeEventListener("scroll", handleScroll)
         }
     })

    useEffect( async () => {
       if(divRef.current) {
          let height = divRef.current.offsetHeight;
          if(height <= window.innerHeight + window.pageYOffset) {
             let response = await getPicturesByArtistUserName(username,30, 0);
             console.log(response)
             if(response.length > 0) {
                pictures.push(...response);
                setPictures(pictures)
             }
          }
       }
    }, [newPictures])

    const handleScroll =  async () => {
       if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight && !isLoading) {
          setIsLoading(true)
          let response = await getPicturesByArtistUserName(username, 30, 0);
          if(response.length > 0) {
             pictures.push(...response);
             setPictures(pictures)
             setIsLoading(false)
          };
       }
    }*/

   return (<BasicLayout>
            <h1 className={ dailyArt.simpleArtTitle }>Simple Art</h1>
            <div className={ dailyArt.dailyArt} ref={divRef}>
                <InfiniteScroll getObjects = {getPictures} isMaxPage = {checkIsMaxPage} lastElement = {lastElement}>
                    <Gallery pictures = {newPictures} setLastElement = {setLastElement}/>
                </InfiniteScroll>
            </div>
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
            username: username,
            firstPageIndex: pictures[pictures.length -1]._id
        }
    }
}


export default Username;