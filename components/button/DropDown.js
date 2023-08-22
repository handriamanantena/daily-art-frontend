import {NavigationLink} from "./NavigationLink";
import {NavigationBar} from "../common/NavigationBar";
import React, {useState} from "react";
import {H3NavHideOnMobile} from "../common/H3NavHideOnMobile";
import {NavigationButton} from "./NavigationButton";

export const DropDown = ({children}) => {

    let [show, setShow] = useState(false);

    let dropDown = () => {
        setShow(!show);
    }

    return <div className="flex static">
        <button onMouseOver={dropDown} className="">
            <H3NavHideOnMobile text="Add Drawing"/>
        </button>
        <div hidden={show} className="grow absolute top-14 bg-white w-40">
            <div className="hover:bg-slate-300">
                <NavigationLink path={`/dailyart`} text="Link 1"/>
            </div>
            <div className="hover:bg-slate-300">
                <NavigationLink path={`/dailyart`} text="Link 2"/>
            </div>
        </div>
    </div>
}