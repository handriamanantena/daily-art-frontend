import Gallery from "../components/Gallery";
import React, {useState, Fragment} from 'react';
import dailyArt from '../styles/DailyArt.module.css'
import {getPicturesByPage} from "../common/api/pictures";
import {BasicLayout} from "../components/common/BasicLayout";
import {InfiniteScroll} from "../components/InfiniteScroll";
import Loading from "../components/loading/Loading";

let pageSize = 14;


function DailyArt({ pictures }) {
    let [newPictures, setPictures] = useState(pictures)
    let [isLoading, setIsLoading] = useState(false)
    let [lastElement, setLastElement] = useState(null);
    let [pageIndex, setPageIndex] = useState(pictures[pictures?.length - 1]._id);

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
          <InfiniteScroll getObjects = {getPictures} maxPage = {10} lastElement={lastElement}>
             <Gallery pictures = {newPictures} setLastElement = {setLastElement}/>
              { isLoading ? <Loading><p>Loading...</p></Loading> : <Fragment></Fragment>}
          </InfiniteScroll>
       </BasicLayout>);

}


export async function getStaticProps() {
   const pictures =  await getPicturesByPage(null, pageSize, null);
   return {
      props: {
         pictures : pictures,
      },
       revalidate: +(process.env.NEXT_PUBLIC_REVALIDATE_SEC)
   }
}


export default DailyArt;