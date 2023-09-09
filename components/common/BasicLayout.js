import {Fragment, useContext, useEffect, useState} from "react";
import {HeaderBar} from "./HeaderBar"
import {Footer} from "./Footer"
import AuthContext from "../../common/context/auth-context";
import useAxiosPrivate from "../../common/hooks/useAxiosPrivate";
import React from "react";
import {LoadingScreen} from "../loading/LoadingScreen";

export function BasicLayout({children}) {

    const ctx = useContext(AuthContext);
    const axiosPrivate = useAxiosPrivate();
    const [isLoadingHidden, setLoadingHidden] = useState(true);

    useEffect(() => {
        let forceReload = localStorage.getItem("forceReload");
        if(forceReload === "true") {
            setLoadingHidden(false);
            localStorage.setItem("forceReload", false);
            window.location.reload();
        }
    }, []);

    useEffect(async () => {
        console.log("testing login")
        // API endpoint where we send form data.
        let endpoint = process.env.NEXT_PUBLIC_PICTURES_API_HOST + process.env.NEXT_PUBLIC_PICTURES_API_PORT + "/refresh";
        if(ctx.token == undefined) { // get access token when browser is closed (no log out)
            console.log("refresh");
            try {
                const response = await axiosPrivate.post(endpoint, //TODO check if ur calling this endpoint twice from other hook
                    {},
                    {
                        headers: {'Content-Type': 'application/json'},
                        withCredentials: true
                    }
                );
                console.log(JSON.stringify(response?.data));
                ctx.login(response?.data);
            } catch (err) {
                console.log(err);
            }
        }
        /*else { //TODO to delete not sure what this does. might be related to browser closing
            console.log("login test")
            endpoint = process.env.NEXT_PUBLIC_PICTURES_API_HOST + process.env.NEXT_PUBLIC_PICTURES_API_PORT + "/jwt"

            try {
                const response = await axiosPrivate.post(endpoint,
                    {},
                    {
                        headers: {'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + ctx.token},
                        withCredentials: true
                    }
                );
                console.log(JSON.stringify(response?.data));
            } catch (err) {
                console.log(err);
            }
        }*/


    }, [ctx.token])

    return (<Fragment>
        <LoadingScreen isLoadingHidden={isLoadingHidden}>
            <p className="text-black">Loading...</p>
        </LoadingScreen>
        <HeaderBar/>
            <main>{children}</main>
        <Footer/>
    </Fragment>)

}