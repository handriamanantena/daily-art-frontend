import React, {Fragment, useContext, useEffect, useState} from "react";
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
import Link from "next/link";
import {ProfilePicture} from "../picture/ProfilePicture";
import {SlideMenuImageLink} from "../button/SlideMenuImageLink";


export function HeaderBar() {

    const router = useRouter();
    const ctx = useContext(AuthContext);
    const [isShowAddPicture, hideAddPicture, showAddPicture] = useShowPopUp();
    const [isShowDailyChallenge, hideDailyChallenge, showDailyChallenge] = useShowPopUp();

    const logout = () => {
      ctx.logout();
    };

    const login = async () => {
        await router.push("/signin");
    };

    useEffect(async () => {
        const init = async () => {
            const { Sidenav, initTE } = await import("tw-elements");
            initTE({ Sidenav });
        };
        await init();
    }, []);

    return (
        <Fragment>
            <div className="sticky grid top-0 z-50 border-b h-16 bg-white content-center flex items-center z-[1034]" id="slim-content">
                <PopUp popup={<AddPictureInfo/>}
                       isShowPopup={isShowAddPicture}
                       hidePopUp={hideAddPicture}/>
                <PopUp popup={<DrawingOftheDay/>}
                       isShowPopup={isShowDailyChallenge}
                       hidePopUp={hideDailyChallenge}/>
                <NavigationBar>
                    <button className="flex-none"
                            type="button"
                            data-te-sidenav-toggle-ref
                            data-te-target="#sidenav">
                        <svg className="hover:fill-cyan-600" width={24} height={24} xmlns="http://www.w3.org/2000/svg"
                             viewBox="0 0 448 512">
                            <path
                                d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"/>
                        </svg>
                    </button>
                    <NavigationImageLink path="/" imagePath="/icons/pen-to-square-regular.svg" text="Daily イラスト"/>
                    <div className="bg-slate-600 w-px h-5 mx-2"/>
                    {ctx.isLoggedIn &&
                    <Link href={`/dailyart/${encodeURIComponent(ctx.userName)}`}>
                        <a className="flex flex-row px-2">
                            <div className="relative h-8 w-8">
                                <ProfilePicture/>
                            </div>
                        </a>
                    </Link>}
                    <DropDown menuOption={
                        <button className="z-40 hover:text-cyan-600">
                            <div className="flex flex-row group">
                                <NavigationImage image="/placeholder/picture.svg"/>
                                <H3NavHideOnMobile text="Submit"/>
                            </div>
                        </button>}>
                        <div className="bg-black">
                            <div className="hover:bg-cyan-600 p-3 slate-400 border-b border-x">
                                <NavigationButton onClick={showAddPicture} title="Add Drawing">
                                    <h3 className="font-bold text-white">Add Drawing</h3>
                                </NavigationButton>
                            </div>
                            <div className="hover:bg-cyan-600 p-3 slate-400 border-b border-x">
                                <NavigationButton onClick={showDailyChallenge} title="Daily Challenge">
                                    <h3 className="font-bold text-white">Daily Challenge</h3>
                                </NavigationButton>
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
            <div id="sidenav"
                 className="z-[300] h-[0px] -translate-x-full bg-white absolute overflow-hidden shadow-[0_4px_12px_0_rgba(0,0,0,0.07),_0_2px_4px_rgba(0,0,0,0.05)] data-[te-sidenav-hidden='false']:translate-x-0 dark:bg-zinc-800"
                 data-te-sidenav-init
                 data-te-sidenav-backdropClass="bg-black">
                <ul>
                    <li className="relative">
                        <SlideMenuImageLink path="/dailyart" imagePath="/icons/house-solid.svg" text="Home"/>
                    </li>
                    <li className="relative">
                    <SlideMenuImageLink path="/" imagePath="/icons/rocket-solid.svg" text="Challenges"/>
                    </li>
                    <li className="relative">
                        <SlideMenuImageLink path="/" imagePath="/icons/trophy-solid.svg" text="Leader board"/>
                    </li>
                </ul>
            </div>
            <div className="grid content-center bg-white md:h-24 border-b md:pb-3">
                <h1 className="text-center md:text-7xl">Daily イラスト</h1>
            </div>
        </Fragment>)
}
