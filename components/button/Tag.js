import {XSVG} from "../svg/XSVG";
import React from "react";

export const Tag = ({tag, deleteTag}) => {

    let deleteTagOnClick = (e) => {
        deleteTag(tag);
    }

    return <div className="flex flex-wrap bg-red-200 m-1 p-1 w-fit">
        <div className="fle">
        {tag}
            <div className="w-fit h-fit" onClick={deleteTagOnClick}>
                <XSVG/>
            </div>
    </div>
    </div>

}