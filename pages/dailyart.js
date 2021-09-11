import Gallery from "../components/Gallery";
/*import { promises as fs } from 'fs'
import path from 'path';*/
import React from 'react';


function DailyArt({ galleries }) {
   React.useEffect(() => {
      const handleScroll = e => {
         console.log('scroll')
         if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            console.log('bottom')
            console.log('bottom')
            let newGallery = galleries[0]
            newGallery.page = 1
           galleries.push(newGallery)


         }
      }
      document.addEventListener("scroll", handleScroll, { passive: true })
      return () => {
         // This cleans up the event handler when the component unmounts.
         document.removeEventListener("scroll", handleScroll)
      }
   }, [])
  /* const [gallery, setUsers] = useState([])*/

   return (galleries.map((gallery, i) => {
      return <Gallery pictures = {gallery.pictures} key = {i}/>
   }))

}

async function getNextGallery(galleries) {
   const host = 'http://192.168.0.130:3001'
   const res = await fetch(host + "/pictures?date=2021-10");
   const gallery = await res.json()
   return galleries.push(await gallery)
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


/*export async function getStaticProps() {
   const postsDirectory = "F:\\art\\pictures\\test"
   const filenames = await fs.readdir(postsDirectory)
   const root = 'http://192.168.0.130:3001/file/'
   const pictures = filenames.map(async (filename) => {
      const filePath = path.join(postsDirectory, filename)
      const fileContents = await fs.readFile(filePath, 'utf8')

      // Generally you would parse/transform the contents
      // For example you can transform markdown to HTML here

      return {
         url: root + filename
      }
   })
   // By returning { props: { pictures } }, the DailyArt component
   // will receive `pictures` as a prop at build time
   return {
      props: {
         pictures: await Promise.all(pictures),
      },
   }
}*/


export default DailyArt;