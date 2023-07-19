import {Fragment, useContext, useEffect} from "react";
import {NavigationBar} from "./NavigationBar"
import {Footer} from "./Footer"
import AuthContext from "../../common/context/auth-context";
import useAxiosPrivate from "../../common/hooks/useAxiosPrivate";

export function BasicLayout({children}) {

    const ctx = useContext(AuthContext);
    const axiosPrivate = useAxiosPrivate();

    useEffect(async () => {
        console.log("testing login")
        // API endpoint where we send form data.
        let endpoint = process.env.NEXT_PUBLIC_PICTURES_API_HOST + process.env.NEXT_PUBLIC_PICTURES_API_PORT + "/refresh";
        if(ctx.token == undefined) { // get access token when browser is closed (no log out)
            console.log("refresh");
            try {
                const response = await axiosPrivate.post(endpoint,
                    {},
                    {
                        headers: {'Content-Type': 'application/json'},
                        withCredentials: true
                    }
                );
                console.log(JSON.stringify(response?.data));
                const accessToken = response?.data?.accessToken;
                ctx.login(accessToken);
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
        <NavigationBar/>
            <main>{children}</main>
        <Footer/>
    </Fragment>)

}