

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

export {googleLogin}
