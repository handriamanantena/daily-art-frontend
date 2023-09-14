

async function getNextGallery(page) {
    const host = process.env.NEXT_PUBLIC_PICTURES_API_HOST + process.env.NEXT_PUBLIC_PICTURES_API_PORT
    const res = await fetch(host + "/pictures?page=" + page);
    return await res.json()
}

async function getPictures() {
    const host = process.env.NEXT_PUBLIC_PICTURES_API_HOST + process.env.NEXT_PUBLIC_PICTURES_API_PORT
    const res = await fetch(host + "/pictures");
    return await res.json()
}

async function getPictureById(id) {
    const host = process.env.NEXT_PUBLIC_PICTURES_API_HOST + process.env.NEXT_PUBLIC_PICTURES_API_PORT
    const res = await fetch(host + "/pictures/artists/" + id);
    return await res.json()
}

async function getPictureWithProfilePicture(id) {
    const host = process.env.NEXT_PUBLIC_PICTURES_API_HOST + process.env.NEXT_PUBLIC_PICTURES_API_PORT
    const res = await fetch(host + "/pictures/artists/" + id + "?artistProjection=userName,profilePicture");
    return await res.json()
}

async function getPicturesByPage(dateIndex, pageSize, pageIndex) {
    let query = "?";
    if(pageSize) {
        query += "pageSize=" + pageSize;
        if(dateIndex) {
            query += "&date=" + dateIndex;
        }
        else if(pageIndex) {
            query += "&pageIndex=" + pageIndex;
        }
    }
    const host = process.env.NEXT_PUBLIC_PICTURES_API_HOST + process.env.NEXT_PUBLIC_PICTURES_API_PORT
    const res = await fetch(host + "/pictures" + query);
    console.log(JSON.stringify(res));
    return await res.json()
}

/*function getPicturesByPageClientSide() {
    console.log("getPicturesByPageClientSide");

    const fetcher = url => fetch(url).then(res => res.json())


    return fetcher;
}
*/
async function getPicturesByArtist(artist, pageIndex, pageSize) {
    const host = process.env.NEXT_PUBLIC_PICTURES_API_HOST + process.env.NEXT_PUBLIC_PICTURES_API_PORT
    const res = await fetch(host + "/pictures?artist=" + artist);
    return await res.json()
}

async function getPicturesByArtistUserName(userName, pageSize, pageIndex) {
    let query = "?";
    console.log("getPicturesByArtistUserName getPictures index " + pageIndex);
    if(pageSize) {
        query += "pageSize=" + pageSize;
        if(pageIndex != 0 && pageIndex != undefined) {
            query += "&pageIndex=" + pageIndex;
        }
    }
    query += "&userName=" + userName
    const host = process.env.NEXT_PUBLIC_PICTURES_API_HOST + process.env.NEXT_PUBLIC_PICTURES_API_PORT
    const res = await fetch(host + "/pictures" + query);
    return await res.json()
}

function createPicturePath(picture) {
    let pictureName = picture.pictureName.replace(/ /g, "-");
    return pictureName + "-" + picture._id.replace(/\.md$/, '');
}

function getPictureIdFromPath(path) {
    let pathArray = path.split("-");
    return  pathArray[pathArray.length-1];
}

export {getNextGallery, getPictures, getPictureById, getPicturesByPage, getPicturesByArtistUserName, getPictureWithProfilePicture, createPicturePath, getPictureIdFromPath}