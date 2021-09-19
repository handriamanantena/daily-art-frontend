import { getNextGallery } from "./api/pictures";


async function getPictures(page, setPage, galleries, setGalleryList) {
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

export {getPictures}