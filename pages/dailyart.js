import Gallery from "../components/Gallery";
import { promises as fs } from 'fs'
import path from 'path';


function DailyArt({ pictures }) {
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
   // By returning { props: { pictures } }, the Blog component
   // will receive `pictures` as a prop at build time
   console.log("dailyart" + await Promise.all(pictures))
   return {
      props: {
         pictures: await Promise.all(pictures),
      },
   }
}


export default DailyArt