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
import {DrawingOftheDay} from "../popup/DrawingOfTheDay";


export function HeaderBar() {

    const router = useRouter();
    const ctx = useContext(AuthContext);
    const [isShowAddPicture, hideAddPicture, showAddPicture] = useShowPopUp();
    const [isShowDailyChallenge, hideDailyChallenge, showDailyChallenge] = useShowPopUp();

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
        <div className="bg-slate-600 w-px h-5 mx-2"/>
            {ctx.isLoggedIn && <NavigationImageLink path={`/dailyart/[username]`} as={`/dailyart/${ctx.userName}`} text="My Art" imagePath="/placeholder/user-solid.svg"/>}
        <DropDown menuOption={
            <button className="z-40 hover:text-cyan-600">
                <div className="flex flex-row group">
                    <NavigationImage image="/placeholder/picture.svg"/>
                    <H3NavHideOnMobile text="Submit"/>
                </div>
            </button>}>
            <div className="bg-black">
                <div className="hover:bg-cyan-600 p-3 slate-400 border-b border-x">
                    <PopUp button={
                        <NavigationButton onClick={showAddPicture} title="Add Drawing">
                            <h3 className="font-bold text-white">Add Drawing</h3>
                        </NavigationButton>}
                           popup={<AddPictureInfo/>}
                           isShowPopup={isShowAddPicture}
                           hidePopUp={hideAddPicture}/>
                </div>
                <div className="hover:bg-cyan-600 p-3 slate-400 border-b border-x">
                    <PopUp button={
                        <NavigationButton onClick={showDailyChallenge} title="Daily Challenge">
                            <h3 className="font-bold text-white">Daily Challenge</h3>
                        </NavigationButton>}
                           popup={<DrawingOftheDay/>}
                           isShowPopup={isShowDailyChallenge}
                           hidePopUp={hideDailyChallenge}/>
                </div>
            </div>
        </DropDown>
        {ctx.isLoggedIn && <div className="bg-slate-600 w-px h-5 ml-5 mx-2"/>}
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
