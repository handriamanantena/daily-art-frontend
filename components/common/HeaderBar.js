import React, {Fragment, useContext} from "react";
import Image from "next/image";
import {NavigationImageLink} from "../button/NavigationImageLink";
import AuthContext from "../../common/context/auth-context";
import {useRouter} from "next/router";
import useShowPopUp from "../../common/hooks/useShowPopUp";
import {H3NavHideOnMobile} from "./H3NavHideOnMobile";
import {NavigationBar} from "./NavigationBar";
import {PopUp} from "../popup/Popup";
import {AddPictureInfo} from "../popup/AddPictureInfo";
import {NavigationButton} from "../button/NavigationButton";
import {NavigationImage} from "../image/NavigationImage";
import {DropDown} from "../button/DropDown";
import {DropDownLink} from "../Link/DropDownLink";


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
        <DropDown>
            <div className="bg-black ">
                <div className="hover:bg-cyan-600 p-3">
                    <PopUp button={
                        <NavigationButton onClick={showPopUp} title="Add Drawing">
                            <NavigationImage image="/placeholder/picture.svg"/>
                            <h3 className="font-bold text-white">Add Drawing</h3>
                        </NavigationButton>}
                           popup={<AddPictureInfo/>}
                           isShowPopup={isShowPopup}
                           hidePopUp={hidePopUp}/>
                </div>
                <div className="hover:bg-cyan-600 p-3">
                    <DropDownLink path={`/dailyart`} text="Daily Challenge"/>
                </div>
            </div>
        </DropDown>
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
