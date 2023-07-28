import React, {Fragment, useContext, useEffect, useRef, useState} from 'react';
import jwt_decode from "jwt-decode";
import {googleLogin} from "../../../common/Login"
import Head from "next/head";
import { useRouter } from 'next/router'
import AuthContext from "../../../common/context/auth-context";

function GoogleButton (){
    const router = useRouter()
    const authCtx = useContext(AuthContext);

    useEffect(() => {
        window.onGoogleLibraryLoad = () => {
            google.accounts.id.initialize({
                client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
                callback: handleCredentialResponse
            })
            const parent = document.getElementById('google_btn');
            google.accounts.id.renderButton(parent,  {
                theme: "filled_blue",
                size: "large",
                width: 304
            });
        }
    });

    async function handleCredentialResponse(response) {
        console.log("Encoded JWT ID token: " + response.credential);
        console.log(jwt_decode(response.credential))
        let loginResponse = await googleLogin(response.credential)
        authCtx.login(loginResponse.accessToken);
        console.log("jwt from backend " + JSON.stringify(loginResponse));
        if(loginResponse.artist.userName) {
            await router.push("/dailyart");
        }
        else {
            await router.push("/username");
        }
    }

    return (
        <Fragment>
            <Head>
                <script src="https://accounts.google.com/gsi/client" async defer/>
            </Head>
            <div id="google_btn"/>
        </Fragment>
        );

}

export default GoogleButton;
