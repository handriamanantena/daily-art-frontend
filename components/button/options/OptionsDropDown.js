import {NavigationButton} from "../NavigationButton";
import React from "react";

export const OptionsDropDown = ({options}) => {

    return <div className="flex-col grow absolute top-[37px] left-[20px] w-48">
        <svg height={12} viewBox="0 0 21 12" width={21} className="-scale-y-100 fill-white group-hover:flex hover:flex">
            <path d="M20.685.12c-2.229.424-4.278 1.914-6.181 3.403L5.4 10.94c-2.026 2.291-5.434.62-5.4-2.648V.12h20.684z"></path>
        </svg>
        <ul className="bg-white grow">
            {options.map(({ onClick, title, svg}) => {
                return <li className="group-hover:flex hover:flex hover:bg-cyan-600 p-2 slate-400 border-b border-x w-30">
                    <NavigationButton onClick={onClick} title={title}>
                        {svg}
                        <h3>{title}</h3>
                    </NavigationButton>
                </li>
            })}
        </ul>
    </div>

}