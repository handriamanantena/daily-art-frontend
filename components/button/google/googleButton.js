import React, {Fragment, useContext, useEffect, useRef, useState} from 'react';
import jwt_decode from "jwt-decode";
import {googleLogin} from "../../../common/Login"
import Head from "next/head";
import { useRouter } from 'next/router'
import AuthContext from "../../../common/context/auth-context";
import useLogin from "../../../common/hooks/useLogin";

function GoogleButton (){

    const login = useLogin();

    useEffect(() => {
        const script = document.createElement('script');

        script.src = 'https://accounts.google.com/gsi/client';
        script.async = true;
        script.defer = true;

        document.body.appendChild(script);

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

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    async function handleCredentialResponse(response) {
        console.log("Encoded JWT ID token: " + response.credential);
        console.log(jwt_decode(response.credential))
        let loginResponse = await googleLogin(response.credential)
        await login(loginResponse);
    }

    return (
        <Fragment>
            <div id='google_btn'/>
        </Fragment>
        );

}

export default GoogleButton;
