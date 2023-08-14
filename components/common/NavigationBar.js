import React from "react";

export const NavigationBar = ({children}) => {

    return <div className="sticky grid top-0 z-50 border-b h-16 bg-white content-center flex pl-5 items-center">
        <div className="flex pl-5 items-center">
            {children}
        </div>
    </div>
}