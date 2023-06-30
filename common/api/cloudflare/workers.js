
export const uploadImageToCloudflare = async (userName, pictureName, token, file) => {
    const cloudflareWorkerUrl = process.env.REACT_APP_UPLOAD_PICTURE_API;
    let responseSignedUrl = fetch(cloudflareWorkerUrl + `picture?userName=${userName}&pictureName=${pictureName}`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        },
    });
    if(responseSignedUrl?.status != 200) {
        console.error("unable to add picture");
        return null;
    }
    else {
        let data = new FormData();
        data.append('file', file, file.name);
        let response = fetch(responseSignedUrl.text(), {
            method: "PUT",
            body: data,
        });
        if(response.status != 200) {
            // TODO need to delete picture in backend
            return null;
        }
        else {
            return response;
        }
    }

};