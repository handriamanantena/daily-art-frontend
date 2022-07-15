

async function getNextGallery(page) {
    const host = process.env.REACT_APP_PICTURES_API_HOST + process.env.REACT_APP_PICTURES_API_PORT
    const res = await fetch(host + "/pictures?page=" + page);
    return await res.json()
}

async function getPictures() {
    const host = process.env.REACT_APP_PICTURES_API_HOST + process.env.REACT_APP_PICTURES_API_PORT
    const res = await fetch(host + "/pictures");
    return await res.json()
}

async function getPictureById(id) {
    const host = process.env.REACT_APP_PICTURES_API_HOST + process.env.REACT_APP_PICTURES_API_PORT
    const res = await fetch(host + "/pictures/" + id);
    return await res.json()
}

export {getNextGallery, getPictures, getPictureById}