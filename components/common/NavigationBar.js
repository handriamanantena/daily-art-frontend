import React, {Fragment} from "react";
import Image from "next/image";
import Link from 'next/link'
import {NavigationImageLink} from "../button/NavigationImageLink";


export function NavigationBar() {

    return (<header className="flex pl-5 items-center">
        <button className="flex-none pt-2">
            <Image src="/icons/bars-solid.svg" width={24} height={24}/>
        </button>
        <NavigationImageLink path="/" imagePath="/icons/pen-to-square-regular.svg" text="Daily Art"/>
        <div className="bg-slate-600 w-px h-5"></div>
            <NavigationImageLink path="/" text="Today's Art"/>
        <div className="bg-slate-600 w-px h-5"></div>
        <div className="flex ml-auto">
            <button>
                Sign In
            </button>
        </div>
    </header>)
}
