import Gallery from "../components/Gallery";
import React, {useEffect, useState, useRef} from 'react';
import dailyArt from '../styles/DailyArt.module.css'
import { getPictures } from '../common/GetPictures'

function DailyArt({ galleries }) {
   const divRef = useRef()
   let [galleryList, setGalleryList] = useState(galleries)
   let [page, setPage] = useState(1)
   let [isLoading, setIsLoading] = useState(false)
   useEffect(() => {
      window.addEventListener("scroll", handleScroll)
      return () => {
         window.removeEventListener("scroll", handleScroll)
      }
   })

   useEffect( async () => {
      console.log('inside 1')
      if(divRef.current) {
         console.log('inside 2')
         let height = divRef.current.offsetHeight;
         if(height <= window.innerHeight + window.pageYOffset) {
             await getPictures(page, setPage, galleries, setGalleryList)
         }
      }
   }, [galleryList])

   const handleScroll =  async () => {
      if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight && !isLoading) {
         console.log(page)
         setIsLoading(true)
         getNextGallery(page).then((gallery) => {
            if(gallery.pictures) {
               console.log('inside 5')
               setPage(page => page + 1)
               galleries.push(gallery)
               setGalleryList([... galleries])
               setIsLoading(false)
            }
         })
      }
   }
   return (<div>
            <h1 className={ dailyArt.simpleArtTitle }>Simple Art</h1>
            <div className={ dailyArt.dailyArt} ref={divRef}>
            {
                (galleryList.map((gallery) => {
                  return <Gallery pictures = {gallery.pictures} key = {gallery.page}/>
               }))
            }
            </div>
         </div>);

}


async function getNextGallery(page) {
   const host = 'http://192.168.0.130:3001'
   const res = await fetch(host + "/pictures?page=" + page);
   return await res.json()
}



export async function getStaticProps() {
   console.log('static props')
   const host = 'http://192.168.0.130:3001'
   const res = await fetch(host + "/pictures?date=2021-09");
   const gallery = await res.json()
   let galleries = []
   galleries.push(await gallery)
   return {
      props: {
         galleries : galleries
      }
   }
}


export default DailyArt;