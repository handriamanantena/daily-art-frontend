

export const uploadImage = async (userName, pictureName, token, file, callbackFunction) => {
    return await callbackFunction(userName, pictureName, token);
};

export const uploadImageToNodeServer =  async (userName, pictureName, token, file) => {
    let data = new FormData();
    data.append('file', file, file.name);
    data.append('pictureName', e.target.pictureName.value);
    const host = process.env.REACT_APP_PICTURES_API_HOST + process.env.REACT_APP_PICTURES_API_PORT;
    const response = await fetch(host + "/pictures/" + ctx.userName, {
        method: "POST",
        credentials: 'include', // include, *same-origin, omit
        headers: {
            'Authorization': 'Bearer ' + token
        },
        body: data,
    }).catch(e => {
        e.preventDefault();
    });
};