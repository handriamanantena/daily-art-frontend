import Gallery from "../components/Gallery";
import React, {useEffect, useState, useRef, Fragment} from 'react';
import dailyArt from '../styles/DailyArt.module.css'
import {getPicturesByPage, getPicturesByPageClientSide} from "../common/api/pictures";
import {BasicLayout} from "../components/common/BasicLayout";
import {InfiniteScroll} from "../components/InfiniteScroll";
import Loading from "../components/loading/Loading";

let pageSize = 2;


function DailyArt() {
    let [pictures, setPictures] = useState([]);
    let [isLoading, setIsLoading] = useState(false);
    let [lastElement, setLastElement] = useState(null);
    let [pageIndex, setPageIndex] = useState(undefined);

    useEffect(async () => {
        let response = await getPicturesByPage(null, pageSize, null);
        setPictures(response);
        setPageIndex(response[response.length-1]._id);

    }, []);

    let getPictures = async () => {
        setIsLoading(true)
        let response = await getPicturesByPage(null, pageSize, pageIndex);
        if(response.length > 0) {
            setPageIndex(response[response.length-1]._id);
            pictures.push(...response);
            setPictures(pictures)
        }
        setIsLoading(false);
    }

   return (
       <BasicLayout>
          <h1 className={dailyArt.simpleArtTitle}>Simple Art</h1>
          <InfiniteScroll getObjects = {getPictures} maxPage = {10} lastElement={lastElement}>
             <Gallery pictures = {pictures} setLastElement = {setLastElement}/>
              { isLoading ? <Loading/> : <Fragment></Fragment>}
          </InfiniteScroll>
       </BasicLayout>);

}


/*export async function getStaticProps() {
   const pictures =  await getPicturesByPage(null, pageSize, null);
   return {
      props: {
         pictures : pictures
      }
   }
}*/


export default DailyArt;