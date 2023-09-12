const useGetPictures = () => {

    let getPicturesByArtistUserName = async (userName, pageSize, pageIndex, setIsLoading) => {
        setIsLoading(true);
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
        setIsLoading(false);
        return await res.json()
    }

    return [ getPicturesByArtistUserName ];
}

export default useGetPictures;