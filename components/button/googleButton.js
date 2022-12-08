import React, {Fragment, useEffect} from 'react';
import Gallery from "../Gallery";
import jwt_decode from "jwt-decode";
import {login} from "../../common/Login"
import Head from "next/head";
import { useRouter } from 'next/router'

function GoogleButton (){
    const router = useRouter()

    useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
            client_id: process.env.GOOGLE_CLIENT_ID,
            callback: handleCredentialResponse
        });
        google.accounts.id.renderButton(
            document.getElementById("googleButton"),
            {
                theme: "filled_blue",
                size: "large",
                width: "304",
                shape: "pill"
            }  // customization attributes
        );
    });

    async function handleCredentialResponse(response) {
        console.debug("Encoded JWT ID token: " + response.credential);
        console.debug(jwt_decode(response.credential))
        let loginResponse = await login(response.credential)
        await router.push("/dailyart");
        console.debug(loginResponse)
    }

    return (
        <Fragment>
            <Head>
                <script src="https://accounts.google.com/gsi/client" async defer/>
            </Head>
            <div id="googleButton"/>
        </Fragment>
        );

}

export default GoogleButton;
