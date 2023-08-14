

async function getArtists(pageIndex, fields, username) {
    let query = "?";
    query += "pageSize=" + process.env.NEXT_PUBLIC_PAGE_SIZE;
    if (pageIndex) {
        query += "&pageIndex=" + pageIndex;
    }
    if (fields) {
        query += "&fields=" + fields;
    }
    if (username) {
        query += "&userName=" + username;
    }
    const host = process.env.NEXT_PUBLIC_PICTURES_API_HOST + process.env.NEXT_PUBLIC_PICTURES_API_PORT
    const res = await fetch(host + "/artist" + query);
    return await res.json()
}

export {getArtists}