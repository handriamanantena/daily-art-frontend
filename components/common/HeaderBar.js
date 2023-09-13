import React, {Fragment, useContext, useEffect} from "react";
import {NavigationSVGLink} from "../button/NavigationSVGLink";
import AuthContext from "../../common/context/auth-context";
import {useRouter} from "next/router";
import useShowPopUp from "../../common/hooks/useShowPopUp";
import {H3NavHideOnMobile} from "./H3NavHideOnMobile";
import {NavigationBar} from "./NavigationBar";
import {AddPictureInfo} from "../popup/AddPictureInfo";
import {NavigationImage} from "../image/NavigationImage";
import {DropDown} from "../button/DropDown";
import {DrawingOftheDay} from "../popup/DrawingOfTheDay";
import Link from "next/link";
import {ProfilePicture} from "../picture/ProfilePicture";
import {SlideMenuImageLink} from "../button/SlideMenuImageLink";
import {PopUp} from "../popup/PopUp";
import {NavDropDownOptions} from "../button/NavDropDownOptions";


export function HeaderBar() {

    const router = useRouter();
    const ctx = useContext(AuthContext);
    const [isShowAddPicture, hideAddPicture, showAddPicture] = useShowPopUp();
    const [isShowDailyChallenge, hideDailyChallenge, showDailyChallenge] = useShowPopUp();
    let options = [{ onClick: showAddPicture, title: "Add Drawing"}, {onClick: showDailyChallenge, title: "Daily Challenge"}];

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
                <PopUp isShowPopup={isShowAddPicture}
                       hidePopUp={hideAddPicture}>
                    <AddPictureInfo hidePopUp={hideAddPicture}/>
                </PopUp>
                <PopUp isShowPopup={isShowDailyChallenge}
                       hidePopUp={hideDailyChallenge}>
                    <DrawingOftheDay hidePopUp={hideDailyChallenge}/>
                </PopUp>
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
                    <NavigationSVGLink path="/" text="Daily イラスト">
                        <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} className="group-hover:fill-cyan-600" viewBox="0 0 512 512">
                            <path d="M373.1 24.97C401.2-3.147 446.8-3.147 474.9 24.97L487 37.09C515.1 65.21 515.1 110.8 487 138.9L289.8 336.2C281.1 344.8 270.4 351.1 258.6 354.5L158.6 383.1C150.2 385.5 141.2 383.1 135 376.1C128.9 370.8 126.5 361.8 128.9 353.4L157.5 253.4C160.9 241.6 167.2 230.9 175.8 222.2L373.1 24.97zM440.1 58.91C431.6 49.54 416.4 49.54 407 58.91L377.9 88L424 134.1L453.1 104.1C462.5 95.6 462.5 80.4 453.1 71.03L440.1 58.91zM203.7 266.6L186.9 325.1L245.4 308.3C249.4 307.2 252.9 305.1 255.8 302.2L390.1 168L344 121.9L209.8 256.2C206.9 259.1 204.8 262.6 203.7 266.6zM200 64C213.3 64 224 74.75 224 88C224 101.3 213.3 112 200 112H88C65.91 112 48 129.9 48 152V424C48 446.1 65.91 464 88 464H360C382.1 464 400 446.1 400 424V312C400 298.7 410.7 288 424 288C437.3 288 448 298.7 448 312V424C448 472.6 408.6 512 360 512H88C39.4 512 0 472.6 0 424V152C0 103.4 39.4 64 88 64H200z"/>
                        </svg>
                    </NavigationSVGLink>
                    <div className="bg-slate-600 w-px h-5 mx-2"/>
                    {ctx.isLoggedIn &&
                    <Link href={{
                        pathname: "/dailyart/[userName]",
                        query: { userName: encodeURIComponent(ctx.userName)},
                    }} as={`/dailyart/${encodeURIComponent(ctx.userName)}`}>
                        <a className="flex flex-row px-2">
                            <div className="relative h-8 w-8">
                                <ProfilePicture profilePicture={localStorage.getItem("profilePicture")}/>
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
                        <NavDropDownOptions options={options}/>
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
                 data-te-sidenav-init>
                <ul>
                    <li className="relative">
                        <SlideMenuImageLink path="/dailyart" text="Home">
                            <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} className="group-hover:fill-cyan-600" viewBox="0 0 576 512">
                                <path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"/>
                            </svg>
                        </SlideMenuImageLink>
                    </li>
                    <li className="relative">
                        <SlideMenuImageLink path="/" text="Challenges">
                            <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} className="group-hover:fill-cyan-600" viewBox="0 0 512 512">
                                <path d="M156.6 384.9L125.7 354c-8.5-8.5-11.5-20.8-7.7-32.2c3-8.9 7-20.5 11.8-33.8L24 288c-8.6 0-16.6-4.6-20.9-12.1s-4.2-16.7 .2-24.1l52.5-88.5c13-21.9 36.5-35.3 61.9-35.3l82.3 0c2.4-4 4.8-7.7 7.2-11.3C289.1-4.1 411.1-8.1 483.9 5.3c11.6 2.1 20.6 11.2 22.8 22.8c13.4 72.9 9.3 194.8-111.4 276.7c-3.5 2.4-7.3 4.8-11.3 7.2v82.3c0 25.4-13.4 49-35.3 61.9l-88.5 52.5c-7.4 4.4-16.6 4.5-24.1 .2s-12.1-12.2-12.1-20.9V380.8c-14.1 4.9-26.4 8.9-35.7 11.9c-11.2 3.6-23.4 .5-31.8-7.8zM384 168a40 40 0 1 0 0-80 40 40 0 1 0 0 80z"/>
                            </svg>
                        </SlideMenuImageLink>
                    </li>
                    <li className="relative">
                        <SlideMenuImageLink path="/" text="Leader board">
                            <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} className="group-hover:fill-cyan-600"  viewBox="0 0 576 512">
                                <path d="M400 0H176c-26.5 0-48.1 21.8-47.1 48.2c.2 5.3 .4 10.6 .7 15.8H24C10.7 64 0 74.7 0 88c0 92.6 33.5 157 78.5 200.7c44.3 43.1 98.3 64.8 138.1 75.8c23.4 6.5 39.4 26 39.4 45.6c0 20.9-17 37.9-37.9 37.9H192c-17.7 0-32 14.3-32 32s14.3 32 32 32H384c17.7 0 32-14.3 32-32s-14.3-32-32-32H357.9C337 448 320 431 320 410.1c0-19.6 15.9-39.2 39.4-45.6c39.9-11 93.9-32.7 138.2-75.8C542.5 245 576 180.6 576 88c0-13.3-10.7-24-24-24H446.4c.3-5.2 .5-10.4 .7-15.8C448.1 21.8 426.5 0 400 0zM48.9 112h84.4c9.1 90.1 29.2 150.3 51.9 190.6c-24.9-11-50.8-26.5-73.2-48.3c-32-31.1-58-76-63-142.3zM464.1 254.3c-22.4 21.8-48.3 37.3-73.2 48.3c22.7-40.3 42.8-100.5 51.9-190.6h84.4c-5.1 66.3-31.1 111.2-63 142.3z"/>
                            </svg>
                        </SlideMenuImageLink>
                    </li>
                </ul>
            </div>
            <div className="grid content-center bg-white md:h-24 border-b md:pb-3">
                <h1 className="text-center md:text-7xl">Daily イラスト</h1>
            </div>
        </Fragment>)
}
