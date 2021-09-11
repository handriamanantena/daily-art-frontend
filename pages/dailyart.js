import Gallery from "../components/Gallery";
import React, {useEffect, useState} from 'react';
import gallery from "../styles/Gallery.module.css";

let page = 0

function DailyArt({ galleries }) {

   let [galleryList, setGalleryList] = useState(galleries)
   useEffect(() => {
      window.addEventListener("scroll", handleScroll)
      return () => {
         window.removeEventListener("scroll", handleScroll)
      }
   })
   let isLoading = false
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
   return (<div className={ gallery.gallery}>
            {
                (galleryList.map((gallery) => {
                  return <Gallery pictures = {gallery.pictures} key = {gallery.page}/>
               }))
            }
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