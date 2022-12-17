import React, {useContext, useEffect} from "react";
import Image from "next/image";
import {NavigationImageLink} from "../button/NavigationImageLink";
import AuthContext from "../../common/context/auth-context";
import {useRouter} from "next/router";
import useAxiosPrivate from "../../common/hooks/useAxiosPrivate";


export function NavigationBar() {

    const router = useRouter();
    const axiosPrivate = useAxiosPrivate();
    const ctx = useContext(AuthContext);

    useEffect(async () => {
        console.log("testing login")
        // API endpoint where we send form data.
        let endpoint = process.env.REACT_APP_PICTURES_API_HOST + process.env.REACT_APP_PICTURES_API_PORT + "/refresh";
        if(ctx.token == undefined) {
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
        else {
            console.log("login test")
            endpoint = process.env.REACT_APP_PICTURES_API_HOST + process.env.REACT_APP_PICTURES_API_PORT + "/login"

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
        }


    }, [ctx.token])
    const logout = () => {
      ctx.logout();
    }

    const login = async () => {
        await router.push("/signin");
    }

    return (<header className="flex pl-5 items-center">
        <button className="flex-none pt-2">
            <Image src="/icons/bars-solid.svg" width={24} height={24}/>
        </button>
        <NavigationImageLink path="/" imagePath="/icons/pen-to-square-regular.svg" text="Daily Art"/>
        <div className="bg-slate-600 w-px h-5"/>
        {ctx.isLoggedIn && <NavigationImageLink path="/" text="Today's Art"/>}
        <div className="bg-slate-600 w-px h-5"/>
        {ctx.isLoggedIn && <div className="flex ml-auto">
            <button onClick={logout}>
                Log out
            </button>
        </div>}
        {!ctx.isLoggedIn && <div className="flex ml-auto">
            <button onClick={login}>
                Log In
            </button>
        </div>}
    </header>)
}
