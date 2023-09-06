import {NavigationButton} from "../NavigationButton";
import React from "react";

export const OptionsDropDown = ({options}) => {

    return <div className="flex-col-reverse grow absolute hidden group-hover:flex hover:flex">
        <ul className="bg-black">
            {options.map(({ onClick, title}) => {
                return <li className="hover:bg-cyan-600 p-3 slate-400 border-b border-x">
                    <NavigationButton onClick={onClick} title={title}>
                        <h3 className="font-bold text-white">{title}</h3>
                    </NavigationButton>
                </li>
            })}
        </ul>
    </div>

}