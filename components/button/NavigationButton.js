import React from "react";

export const NavigationButton = ({children, onClick, title}) => {
    return <button className="pl-1 pr-2 flex" onClick={onClick} title={title}>
        {children}
    </button>

}