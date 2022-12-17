import React, {Fragment, useContext, useEffect} from 'react';
import jwt_decode from "jwt-decode";
import {login} from "../../common/Login"
import Head from "next/head";
import { useRouter } from 'next/router'
import AuthContext from "../../common/context/auth-context";

function GoogleButton (){
    const router = useRouter()
    const authCtx = useContext(AuthContext);

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
        console.log("Encoded JWT ID token: " + response.credential);
        console.log(jwt_decode(response.credential))
        let loginResponse = await login(response.credential)
        authCtx.login(response.credential);
        console.log("jwt from backend {0}", loginResponse)
        await router.push("/dailyart");
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
