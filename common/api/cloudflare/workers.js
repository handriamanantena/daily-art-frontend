
export const uploadImageToCloudflare = async (userName, pictureName, dailyChallenge, token) => {

    console.log('upload to cloudflare')
    const cloudflareWorkerUrl = process.env.NEXT_PUBLIC_UPLOAD_PICTURE_API;
    let url = cloudflareWorkerUrl + `picture?userName=${userName}`;
    url = url + `&pictureName=${pictureName}`;

    if(dailyChallenge) {
        url = url + `&dailyChallenge=${encodeURIComponent(dailyChallenge)}`;
    }
    let responseSignedUrl = await fetch(url, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Authorization': 'Bearer ' + token
        },
    });
    if(responseSignedUrl?.status != 200) {
        console.error("unable to add picture");
        return null;
    }
    else {
        return await responseSignedUrl.text();
    }

};