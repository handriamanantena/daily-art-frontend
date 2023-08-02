import React, {useContext} from "react";
import Image from "next/image";
import {NavigationImageLink} from "../button/NavigationImageLink";
import AuthContext from "../../common/context/auth-context";
import {useRouter} from "next/router";
import {AddPictureButton} from "../button/addpictureButton";
import useShowPopUp from "../../common/hooks/useShowPopUp";
import {NavigationH3} from "./NavigationH3";


export function NavigationBar() {

    const router = useRouter();
    const ctx = useContext(AuthContext);
    const [isShowPopup, hidePopUp, showPopUp] = useShowPopUp();

    const logout = () => {
      ctx.logout();
    }

    const login = async () => {
        await router.push("/signin");
    }

    return (<header className="sticky top-0 z-50">
        <div className="flex pl-5 items-center bg-white">
        <button className="flex-none pt-2">
            <Image src="/icons/bars-solid.svg" width={24} height={24} unoptimized/>
        </button>
        <NavigationImageLink path="/" imagePath="/icons/pen-to-square-regular.svg" text="図面"/>
        <div className="bg-slate-600 w-px h-5"/>
        {ctx.isLoggedIn && <NavigationImageLink path={`/dailyart/${ctx.userName}`} text="My Art" imagePath="/placeholder/user-solid.svg"/>}
        <AddPictureButton isShowPopup={isShowPopup} hidePopUp={hidePopUp}>
            <button className="pl-1 pr-2 flex" onClick={showPopUp} title="Add Picture">
                <div className="md:hidden flex items-center justify-center">
                    <Image className="object-cover h-full rounded-md"
                           width={20}
                           height={20}
                           src="/placeholder/picture.svg"
                           unoptimized/>
                </div>
                <NavigationH3 text="Add Picture"></NavigationH3>
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
        </div>
        <div className="bg-white bg-opacity-95 md:h-24 border-t">
            <h1 className="text-center md:text-7xl">Daily イラスト</h1>
        </div>
    </header>)
}
