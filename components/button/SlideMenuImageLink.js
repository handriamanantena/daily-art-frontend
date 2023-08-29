import Image from "next/image";
import Link from "next/link";
import {H3NavHideOnMobile} from "../common/H3NavHideOnMobile";
import React from "react";

export function SlideMenuImageLink({path, as, imagePath, text}) {

    return (<Link href={path} as={as}>
        <a className="flex h-12 cursor-pointer items-center truncate rounded-[5px] px-6 py-4 text-[0.875rem] text-gray-600 outline-none transition duration-300 ease-linear hover:bg-slate-50 hover:text-inherit hover:outline-none focus:bg-slate-50 focus:text-inherit focus:outline-none active:bg-slate-50 active:text-inherit active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10">
            { imagePath ? <div className="flex items-center justify-center">
                <Image src={imagePath} width={20} height={20} unoptimized/>
            </div>: <></> }
            { text ? <H3NavHideOnMobile text={text}/>: <></> }
        </a>
    </Link>)
}