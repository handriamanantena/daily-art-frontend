

async function googleLogin(token) {
    const host = process.env.NEXT_PUBLIC_PICTURES_API_HOST + process.env.NEXT_PUBLIC_PICTURES_API_PORT
    const response = await fetch(host + '/artist/login?platform=google', {
        method: 'POST',
        credentials: 'include', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    });
    return response.json();
}

async function registerGoogleAccount(token) {

}

async function register(email, password) {
    const host = process.env.NEXT_PUBLIC_PICTURES_API_HOST + process.env.NEXT_PUBLIC_PICTURES_API_PORT
    let body = JSON.stringify({
        email,
        password
    })
    const response = await fetch(host + '/register', {
        method: 'POST',
        credentials: 'include', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
        },
        body: body
    });
    if(response.status === 200 || response.status === 201) {
        let json = await response.json();
        console.log("success register " + JSON.stringify(json));
        return json;
    }
    else if(response.status === 409) {
        //setErrMsg("Email Already in Use");
        return null;
    }
    return response;
}

export {googleLogin, register}
