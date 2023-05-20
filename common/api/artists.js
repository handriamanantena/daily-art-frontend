
async function getArtistUserNames() {
    const host = process.env.REACT_APP_PICTURES_API_HOST + process.env.REACT_APP_PICTURES_API_PORT
    const res = await fetch(host + "/artist/username");
    return await res.json();
}


export {getArtistUserNames}