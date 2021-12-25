import { getNextGallery, getPictures, getPictureById } from "./api/pictures";


async function getPicturesByPage(page, setPage, galleries, setGalleryList) {
    console.log('inside 3')
    console.log(page)
    getNextGallery(page).then((gallery) => {
        if (gallery.pictures) {
            console.log('inside 4')
            setPage(page => page + 1)
            galleries.push(gallery)
            setGalleryList([...galleries])
        }
    })
}

async function getAllPictures() {
    let pictures = await getPictures()
    return pictures
}

async function getPicture(id) {
    return await getPictureById(id)
}

export {getPicturesByPage, getAllPictures, getPicture}