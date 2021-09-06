import Gallery from "../components/Gallery";
import { promises as fs } from 'fs'
import path from 'path';
import React from 'react';


function DailyArt({ pictures }) {
   React.useEffect(() => {
      const handleScroll = e => {
         console.log('scroll')
         if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            console.log('bottom')
            return (<Gallery pictures = {pictures} ></Gallery>)
         }
      }
      document.addEventListener("scroll", handleScroll, { passive: true })
      return () => {
         // This cleans up the event handler when the component unmounts.
         document.removeEventListener("scroll", handleScroll)
      }
   }, [])
   return (<Gallery pictures = {pictures} ></Gallery>)
}

export async function getStaticProps() {
   /*const postsDirectory = path.join(process.cwd(), 'posts')*/
   const postsDirectory = "F:\\art\\pictures\\test"
   const filenames = await fs.readdir(postsDirectory)
   const root = 'http://192.168.0.130:3001/file/'
   const pictures = filenames.map(async (filename) => {
      const filePath = path.join(postsDirectory, filename)
      const fileContents = await fs.readFile(filePath, 'utf8')

      // Generally you would parse/transform the contents
      // For example you can transform markdown to HTML here

      return {
         url: root + filename,/*,
         content: fileContents,*/
      }
   })
   // By returning { props: { pictures } }, the DailyArt component
   // will receive `pictures` as a prop at build time
   return {
      props: {
         pictures: await Promise.all(pictures),
      },
   }
}


export default DailyArt;