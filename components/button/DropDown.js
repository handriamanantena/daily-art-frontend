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
        </div>
        <div hidden={hidden}
             className="flex-col-reverse grow absolute w-40 h-36 top-[17px] hidden group-hover:flex hover:flex">
            {children}
        </div>
    </div>
}