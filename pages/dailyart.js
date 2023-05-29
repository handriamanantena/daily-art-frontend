import Gallery from "../components/Gallery";
import React, {useEffect, useState, useRef} from 'react';
import dailyArt from '../styles/DailyArt.module.css'
import { getNextGallery, getPicturesByPage } from "../common/api/pictures";
import {BasicLayout} from "../components/common/BasicLayout";

let pageSize = 10;


function DailyArt({ pictures }) {
   const divRef = useRef()
   let [newPictures, setPictures] = useState(pictures)
   let [date, setDate] = useState(pictures[pictures.length-1].date)
   let [isLoading, setIsLoading] = useState(false)
   useEffect(() => {
      window.addEventListener("scroll", handleScroll)
      return () => {
         window.removeEventListener("scroll", handleScroll)
      }
   })

   useEffect( async () => {
      if(divRef.current) {
         let height = divRef.current.offsetHeight;
         if(height <= window.innerHeight + window.pageYOffset) {
            let response = await getPicturesByPage(date, pageSize);
            console.log(response)
            if(response.length > 0) {
               setDate(response[response.length-1].date);
               pictures.push(...response);
               setPictures(pictures)
            }
         }
      }
   }, [newPictures])

   const handleScroll =  async () => {
      if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight && !isLoading) {
         setIsLoading(true)
         let response = await getPicturesByPage(date, pageSize);
         if(response.length > 0) {
            setDate(response[response.length-1].date);
            pictures.push(...response);
            setPictures(pictures)
            setIsLoading(false)
         };
      }
   }
   return (<BasicLayout>
            <h1 className={ dailyArt.simpleArtTitle }>Simple Art</h1>
            <Gallery pictures = {pictures}/>
         </BasicLayout>);

}


export async function getServerSideProps() {
   const pictures = await getPicturesByPage(new Date().toISOString(), pageSize);
   return {
      props: {
         pictures : pictures
      }
   }
}


export default DailyArt;