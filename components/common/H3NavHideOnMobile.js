import React from "react";

export const H3NavHideOnMobile = ({text}) => {

    return <h3 className="font-bold hidden md:block group-hover:text-cyan-600 hover:text-cyan-600">{text}</h3>;

}