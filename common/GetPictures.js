import { getNextGallery } from "./api/pictures";


function getPictures(divRef, page, setPage, galleries, setGalleryList) {
    if(divRef.current) {
        console.log('inside 2')
        let height = divRef.current.offsetHeight;
        if(height <= window.innerHeight + window.pageYOffset) {
            console.log('inside 3')
            getNextGallery(page).then((gallery) => {
                if(gallery.pictures) {
                    console.log('inside 4')
                    setPage(page => page + 1)
                    galleries.push(gallery)
                    setGalleryList([... galleries])
                }
            })
        }
    }
}

export {getPictures}