import {useEffect, useState} from "react";

export const ThreeDots = ({type, children}) => {

    let [style, setStyle] = useState(type);

    useEffect(() => {
        if(style == "" || style == undefined) {
             setStyle("dot-elastic");
        }
    });

    return <div className={style}>{children}</div>
};