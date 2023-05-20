import Gallery from "../../components/Gallery";
import React, {useEffect, useState, useRef} from 'react';
import dailyArt from '../../styles/DailyArt.module.css';
import {BasicLayout} from "../../components/common/BasicLayout";
import {getArtistUserNames} from "../../common/api/artists";
import {getPicturesByArtistUserName} from "../../common/api/pictures";

function Username({ username, pictures }) {
    const divRef = useRef()
    let [newPictures, setPictures] = useState(pictures)
    let [isLoading, setIsLoading] = useState(false)
   /* useEffect(() => {
        window.addEventListener("scroll", handleScroll)
        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    })

   useEffect( async () => {
      if(divRef.current) {
         let height = divRef.current.offsetHeight;
         if(height <= window.innerHeight + window.pageYOffset) {
            let response = await getPicturesByArtistUserName(username,30, 0);
            console.log(response)
            if(response.length > 0) {
               pictures.push(...response);
               setPictures(pictures)
            }
         }
      }
   }, [newPictures])

   const handleScroll =  async () => {
      if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight && !isLoading) {
         setIsLoading(true)
         let response = await getPicturesByArtistUserName(username, 30, 0);
         if(response.length > 0) {
            pictures.push(...response);
            setPictures(pictures)
            setIsLoading(false)
         };
      }
   }*/
   return (<BasicLayout>
            <h1 className={ dailyArt.simpleArtTitle }>Simple Art</h1>
            <div className={ dailyArt.dailyArt} ref={divRef}>
               <Gallery pictures = {pictures}/>
            </div>
         </BasicLayout>);

}

export async function setUserNamesToParams() {
    let usernames = await getArtistUserNames()
    return usernames.map(username => {
        return {
            params: {
                username: username
            }
        }
    })
}

export async function getStaticPaths() {
    let paths = await setUserNamesToParams();
    console.log(paths);
    return {
        paths: paths,
        fallback: false, // can also be true or 'blocking'
    }
}


export async function getStaticProps(context) {
    const { params } = context;
    const username = params.username;
    const pictures = await getPicturesByArtistUserName(username, 10, 0);
    return {
        props: {
            pictures : pictures
        }
    }
}


export default Username;