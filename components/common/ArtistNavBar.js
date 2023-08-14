import React from "react";
import {NavigationImageLink} from "../button/NavigationImageLink";
import {NavigationBar} from "./NavigationBar";

export const ArtistNavBar = ({userName}) => {


    return <NavigationBar>
            <NavigationImageLink path={`/dailyart/${encodeURIComponent(userName)}/about`} text="About"/>
            <NavigationImageLink path={`/dailyart/${encodeURIComponent(userName)}/gallery`} text="Gallery"/>
        </NavigationBar>;
}