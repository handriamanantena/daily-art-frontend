import {EditProfile} from "../svg/EditProfile";
import React from "react";

export const EditButton = () => {

    return <button className="grid grid-cols-2 content-center group md:px-3">
        <EditProfile/>
        <h3 className="font-bold text-violet-500 group-hover:text-white hover:text-violet-500">Edit</h3>
    </button>
}