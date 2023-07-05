import React, {useContext, useEffect} from "react";
import Image from "next/image";
import {NavigationImageLink} from "../button/NavigationImageLink";
import AuthContext from "../../common/context/auth-context";
import {useRouter} from "next/router";


export function NavigationBar() {

    const router = useRouter();
    const ctx = useContext(AuthContext);


    const logout = () => {
      ctx.logout();
    }

    const login = async () => {
        await router.push("/signin");
    }

    return (<header className="flex pl-5 items-center">
        <button className="flex-none pt-2">
            <Image src="/icons/bars-solid.svg" width={24} height={24} unoptimized/>
        </button>
        <NavigationImageLink path="/" imagePath="/icons/pen-to-square-regular.svg" text="Daily Art"/>
        <div className="bg-slate-600 w-px h-5"/>
        {ctx.isLoggedIn && <NavigationImageLink path="/dailyart" text="Today's Art"/>}
        {ctx.isLoggedIn && <div className="bg-slate-600 w-px h-5"/>}
        {ctx.isLoggedIn && <NavigationImageLink path={`/dailyart/${ctx.userName}`} text="My Art"/>}
        {ctx.isLoggedIn && <div className="bg-slate-600 w-px h-5"/>}
        {ctx.isLoggedIn && <NavigationImageLink path={`/dailyart/${ctx.userName}`} text="Add a Picture"/>}
        {ctx.isLoggedIn && <div className="bg-slate-600 w-px h-5"/>}
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
