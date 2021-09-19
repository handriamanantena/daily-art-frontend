import Gallery from "../components/Gallery";
import React, {useEffect, useState, useRef} from 'react';
import dailyArt from '../styles/DailyArt.module.css'

let page = 0
let isLoading = false

function DailyArt({ galleries }) {
   const divRef = useRef()
   let [galleryList, setGalleryList] = useState(galleries)
   useEffect(() => {
      window.addEventListener("scroll", handleScroll)
      return () => {
         window.removeEventListener("scroll", handleScroll)
      }
   })

   useEffect(() => {
      if(divRef.current) {
         let height = divRef.current.offsetHeight;
         console.log(height)
         if(height <= window.innerHeight + window.pageYOffset) {
            console.log('inside')
            getNextGallery(page).then((gallery) => {
               if(gallery.pictures) {
                  page += 1
                  galleries.push(gallery)
                  setGalleryList([... galleries])
               }
            })
         }
      }
   })

   const handleScroll =  async () => {
      if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight && !isLoading) {
         console.log(page)
         isLoading = true
         getNextGallery(page).then((gallery) => {
            if(gallery.pictures) {
               page += 1
               galleries.push(gallery)
               setGalleryList([... galleries])
               isLoading = false
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