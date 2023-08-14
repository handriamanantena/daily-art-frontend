import React from "react";
import {NavigationImageLink} from "../button/NavigationImageLink";

export const ArtistNavBar = ({userName}) => {


    return <nav className="sticky top-0 z-50 border-b mt-5">
        <div className="flex pl-5 items-center bg-white">
            <NavigationImageLink path={`/dailyart/${encodeURIComponent(userName)}/about`} text="About"/>
            <NavigationImageLink path={`/dailyart/${encodeURIComponent(userName)}/gallery`} text="Gallery"/>
        </div>
    </nav>
}