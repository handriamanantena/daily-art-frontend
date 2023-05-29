import Gallery from "../components/Gallery";
import React, {useEffect, useState, useRef} from 'react';
import dailyArt from '../styles/DailyArt.module.css'
import {getNextGallery, getPicturesByArtistUserName, getPicturesByPage} from "../common/api/pictures";
import {BasicLayout} from "../components/common/BasicLayout";
import {InfiniteScroll} from "../components/InfiniteScroll";

let pageSize = 10;


function DailyArt({ pictures }) {
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
          <h1 className={dailyArt.simpleArtTitle}>Simple Art</h1>
          <InfiniteScroll getObjects = {getPictures} maxPage = {10} lastElement={lastElement}>
             <Gallery pictures = {newPictures} setLastElement = {setLastElement}/>
          </InfiniteScroll>
       </BasicLayout>);

}


export async function getServerSideProps() {
   const pictures =  await getPicturesByPage(null, pageSize, null);
   return {
      props: {
         pictures : pictures
      }
   }
}


export default DailyArt;