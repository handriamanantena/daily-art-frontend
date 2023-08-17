import React, {Fragment, useContext} from "react";
import Image from "next/image";
import {NavigationImageLink} from "../button/NavigationImageLink";
import AuthContext from "../../common/context/auth-context";
import {useRouter} from "next/router";
import {AddPictureButton} from "../button/addpictureButton";
import useShowPopUp from "../../common/hooks/useShowPopUp";
import {H3NavHideOnMobile} from "./H3NavHideOnMobile";
import {NavigationBar} from "./NavigationBar";


export function HeaderBar() {

    const router = useRouter();
    const ctx = useContext(AuthContext);
    const [isShowPopup, hidePopUp, showPopUp] = useShowPopUp();

    const logout = () => {
      ctx.logout();
    }

    const login = async () => {
        await router.push("/signin");
    }

    return (
        <Fragment>
            <div className="sticky grid top-0 z-50 border-b h-16 bg-white content-center flex items-center">
    <NavigationBar>
        <button className="flex-none pt-2">
            <Image src="/icons/bars-solid.svg" width={24} height={24} unoptimized/>
        </button>
        <NavigationImageLink path="/" imagePath="/icons/pen-to-square-regular.svg" text="Daily イラスト"/>
        <div className="bg-slate-600 w-px h-5"/>
            {ctx.isLoggedIn && <NavigationImageLink path={`/dailyart/[username]`} as={`/dailyart/${ctx.userName}`} text="My Art" imagePath="/placeholder/user-solid.svg"/>}
        <AddPictureButton isShowPopup={isShowPopup} hidePopUp={hidePopUp}>
            <button className="pl-1 pr-2 flex" onClick={showPopUp} title="Add Picture">
                <div className="md:hidden flex items-center justify-center">
                    <Image className="object-cover h-full rounded-md"
                           width={20}
                           height={20}
                           src="/placeholder/picture.svg"
                           unoptimized/>
                </div>
                <H3NavHideOnMobile text="Add Picture"/>
            </button>
        </AddPictureButton>
        {ctx.isLoggedIn && <div className="bg-slate-600 w-px h-5"/>}
        {ctx.isLoggedIn && <div className="flex ml-auto mr-2">
            <button onClick={logout}>
                <h3 className="font-bold hover:text-cyan-600">Log out</h3>
            </button>
        </div>}
        {!ctx.isLoggedIn && <div className="flex ml-auto mr-2">
            <button onClick={login}>
                <h3 className="font-bold hover:text-cyan-600">Log In</h3>
            </button>
        </div>}
    </NavigationBar>
            </div>
            <div className="grid content-center bg-white md:h-24 border-b md:pb-3">
                <h1 className="text-center md:text-7xl">Daily イラスト</h1>
            </div>
        </Fragment>)
}
