import React from "react";
import {XSVG} from "../svg/XSVG";

const CancelButton = ({onclick}) => {

    return (<div className="w-6 h-6 md:m-3 absolute top-0 right-0 m-5 z-50" onClick={onclick}>
        <XSVG/>
    </div>);

}

export {CancelButton}