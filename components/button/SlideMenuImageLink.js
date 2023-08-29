import React from "react";
import {H3Menu} from "../common/H3Menu";

export function SlideMenuImageLink({path, text, children}) {

    return (<a className="group flex h-12 cursor-pointer items-center truncate px-6 py-4 text-[0.875rem]
     text-gray-600 outline-none transition duration-300 ease-linear hover:bg-slate-300 hover:text-inherit
      hover:outline-none focus:bg-slate-50 focus:text-inherit focus:outline-none active:bg-slate-50 active:text-inherit
       active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none
        motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10" href={path}>
            <div className="flex items-center justify-center pr-5">
                {children}
            </div>
            <H3Menu text={text}/>
    </a>)
}