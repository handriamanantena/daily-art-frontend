import React from "react";

export const H3NavHideOnMobile = ({text}) => {

    return <h3 className="font-bold hidden md:block hover:text-cyan-600">{text}</h3>;

}