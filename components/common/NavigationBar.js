import React, {Fragment, useContext} from "react";
import Image from "next/image";
import Link from 'next/link'
import {NavigationImageLink} from "../button/NavigationImageLink";
import AuthContext from "../../common/context/auth-context";
import {useRouter} from "next/router";


export function NavigationBar() {

    const router = useRouter();
    const logout = () => {
      ctx.logout();
    }

    const login = async () => {
        await router.push("/signin");
    }

    const ctx = useContext(AuthContext);
    console.log("loggedIn {0}", ctx.isLoggedIn);
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
