import React from "react";

export const CustomHeader = ({svg, text, leftText}) => {

    return <div className="sticky top-16 z-20 bg-slate-950 h-16 flex flex-row items-center bg-opacity-90">
        <div className="hidden md:block md:ml-10 opacity-100 fill-white">
            {svg}
        </div>
        <h1 className="text-white ml-2 opacity-100 text-base md:text-lg">{text}</h1>
        <div className="flex justify-end grow">
            <h1 className="text-white md:mr-10 text-base md:text-lg">{leftText}</h1>
        </div>
    </div>
}