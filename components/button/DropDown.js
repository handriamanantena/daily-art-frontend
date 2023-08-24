import React, {useState} from "react";

export const DropDown = ({children, menuOption}) => {

    let [hidden, setHidden] = useState(true);

    let dropDown = () => {
        console.log("clicked")
        setHidden(!hidden);
    };

    return <div className="group flex static">
        <div onClick={dropDown} className="flex z-10">
        {menuOption}
            <div className="grid content-center pl-1">
                <svg xmlns="http://www.w3.org/2000/svg" height="0.9em" viewBox="0 0 448 512"
                     className="group-hover:fill-cyan-600 mt-1">
                    <path
                        d="M201.4 342.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 274.7 86.6 137.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/>
                </svg>
            </div>
        </div>
        <div hidden={hidden}
             className="flex-col-reverse grow absolute w-40 h-36 top-[17px] hidden group-hover:flex hover:flex">
            {children}
        </div>

    </div>
}