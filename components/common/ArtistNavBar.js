import React from "react";
import {NavigationLink} from "../button/NavigationLink";
import {NavigationBar} from "./NavigationBar";

export const ArtistNavBar = ({userName}) => {


    return <NavigationBar>
            <NavigationLink path={`/dailyart/${encodeURIComponent(userName)}/about`} text="About"/>
            <NavigationLink path={`/dailyart/${encodeURIComponent(userName)}/gallery`} text="Gallery"/>
        </NavigationBar>;
}