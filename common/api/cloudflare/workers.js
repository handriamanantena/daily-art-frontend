
export const uploadImageToCloudflare = async (userName, pictureName, token) => {
    console.log('upload to cloudflare')
    const cloudflareWorkerUrl = process.env.NEXT_PUBLIC_UPLOAD_PICTURE_API;
    let responseSignedUrl = await fetch(cloudflareWorkerUrl + `picture?userName=${userName}&pictureName=${pictureName}`, {
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