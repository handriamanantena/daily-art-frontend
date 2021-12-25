

async function getNextGallery(page) {
    const host = 'http://192.168.0.130:3001'
    const res = await fetch(host + "/pictures?page=" + page);
    return await res.json()
}

async function getPictures() {
    const host = 'http://192.168.0.130:3001'
    const res = await fetch(host + "/pictures");
    return await res.json()
}

async function getPictureById(id) {
    const host = 'http://192.168.0.130:3001'
    const res = await fetch(host + "/pictures/" + id);
    return await res.json()
}

export {getNextGallery, getPictures, getPictureById}