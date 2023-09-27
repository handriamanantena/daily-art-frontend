import React from "react";

export const CustomHeader = ({svg, text}) => {

    return <div className="sticky top-16 z-20 bg-slate-950	h-16 flex flex-row items-center bg-opacity-90">
        <div className="ml-10 opacity-100 fill-white">
            {svg}
        </div>
        <h1 className="text-white ml-2 opacity-100">{text}</h1>
    </div>
}