import React, {useEffect} from 'react';
import Gallery from "../Gallery";
import jwt_decode from "jwt-decode";
import {login} from "../../common/Login"
function GoogleButton (){

    useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
            client_id: process.env.GOOGLE_CLIENT_ID,
            callback: handleCredentialResponse
        });
        google.accounts.id.renderButton(
            document.getElementById("googleButton"),
            { theme: "outline", size: "large" }  // customization attributes
        );
        google.accounts.id.prompt(); // also display the One Tap dialog
    });

    async function handleCredentialResponse(response) {
        console.debug("Encoded JWT ID token: " + response.credential);
        console.debug(jwt_decode(response.credential))
        let loginResponse = await login(response.credential)
        console.debug(loginResponse)
    }

    return (<div id="googleButton"></div>);

}

export default GoogleButton;