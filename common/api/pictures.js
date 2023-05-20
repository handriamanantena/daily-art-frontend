

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

async function getPicturesByPage(dateIndex, pageSize) {
    let query = "?";
    if(pageSize) {
        query += "pageSize=" + pageSize;
        if(dateIndex) {
            query += "&date=" + dateIndex;
        }
    }
    const host = process.env.REACT_APP_PICTURES_API_HOST + process.env.REACT_APP_PICTURES_API_PORT
    const res = await fetch(host + "/pictures" + query);
    console.log(JSON.stringify(res));
    return await res.json()
}

async function getPicturesByArtist(artist, pageIndex, pageSize) {
    const host = process.env.REACT_APP_PICTURES_API_HOST + process.env.REACT_APP_PICTURES_API_PORT
    const res = await fetch(host + "/pictures?artist=" + artist);
    return await res.json()
}

async function getPicturesByArtistUserName(userName, pageSize, pageIndex) {
    let query = "?";
    if(pageSize) {
        query += "pageSize=" + pageSize;
        if(pageIndex != undefined) {
            query += "&pageIndex=" + pageIndex;
        }
    }
    query += "&userName=" + userName
    const host = process.env.REACT_APP_PICTURES_API_HOST + process.env.REACT_APP_PICTURES_API_PORT
    const res = await fetch(host + "/pictures" + query);
    return await res.json()
}

export {getNextGallery, getPictures, getPictureById, getPicturesByPage, getPicturesByArtist, getPicturesByArtistUserName}