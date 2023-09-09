import {XSVG} from "../svg/XSVG";
import React, {useEffect, useState} from "react";

export const Tag = ({tag, deleteTag}) => {

    let [isTagTooLong, setTagTooLong] = useState(false);

    let deleteTagOnClick = (e) => {
        deleteTag(tag);
    }

    useEffect(() => {
        if(tag.length > +(process.env.NEXT_PUBLIC_MAX_TAG_SIZE)) {
            setTagTooLong(true);
        }
    }, []);

    return <div className={`mr-1 my-1 inline-flex items-center font-bold leading-sm uppercase px-3 py-1 rounded-full ${isTagTooLong ? `bg-red-200 text-red-700`: `bg-blue-200 text-blue-500`}`}>
        <div className="flex flex-row">
        {tag}
            <div className="flex self-center w-fit h-fit" onClick={deleteTagOnClick}>
                <XSVG width={18} height={18}/>
            </div>
    </div>
    </div>

}