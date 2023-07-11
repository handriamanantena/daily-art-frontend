
async function getArtistUserNames() {
    const host = process.env.NEXT_PUBLIC_PICTURES_API_HOST + process.env.NEXT_PUBLIC_PICTURES_API_PORT
    const res = await fetch(host + "/artist/username");
    return await res.json();
}


export {getArtistUserNames}