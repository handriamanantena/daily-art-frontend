import {NavigationLink} from "./NavigationLink";
import {NavigationBar} from "../common/NavigationBar";
import React, {useState} from "react";
import {H3NavHideOnMobile} from "../common/H3NavHideOnMobile";
import {NavigationButton} from "./NavigationButton";
import {DropDownLink} from "../Link/DropDownLink";
import {NavigationImage} from "../image/NavigationImage";

export const DropDown = ({children}) => {

    return <div className="group flex static">
        <button className="z-10 hover:text-cyan-600">
            <NavigationImage image="/placeholder/picture.svg"/>
            <H3NavHideOnMobile text="Add Drawing"/>
        </button>
        <div className="flex-col-reverse grow absolute w-40 h-36 top-[17px] hidden group-hover:flex hover:flex">
            {children}
        </div>
    </div>
}