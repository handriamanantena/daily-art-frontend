import Gallery from "../../components/Gallery";
import React, {useEffect, useState, useRef} from 'react';
import dailyArt from '../../styles/DailyArt.module.css'
import { getPicturesByPage } from '../../common/GetPictures'
import { getNextGallery } from "../../common/api/pictures";
import {BasicLayout} from "../../components/common/BasicLayout";
import {AddPictureButton} from "../../components/button/addpictureButton";
import {setPicturesToParams} from "../picture/[id]";

function Username({ username, galleries }) {
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
                await getPicturesByPage(page, setPage, galleries, setGalleryList)
            }
        }
    }, [galleryList])

    const handleScroll =  async () => {
        if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight && !isLoading) {
            console.log(page)
            setIsLoading(true)
            await getPicturesByPage(page, setPage, galleries, setGalleryList).then(value => {
                console.log(value)
                setIsLoading(false)
            })
        }
    }
    return (<BasicLayout>
        <h1 className={ dailyArt.simpleArtTitle }>Simple Art</h1>
        <div className={ dailyArt.dailyArt} ref={divRef}>
            {<AddPictureButton/>}
            {
                (galleryList.map((gallery) => {
                    return <Gallery pictures = {gallery.pictures} key = {gallery.page}/>
                }))
            }
        </div>
    </BasicLayout>);

}

export async function getStaticPaths() {
    return {
        paths: [{ params: { username: '1' } }, { params: { username: '2' } }],
        fallback: false, // can also be true or 'blocking'
    }
}


export async function getStaticProps() {
    const gallery = await getNextGallery(0)
    let galleries = []
    galleries.push(await gallery)
    return {
        props: {
            galleries : galleries
        }
    }
}


export default Username;