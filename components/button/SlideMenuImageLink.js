import Image from "next/image";
import Link from "next/link";
import {H3NavHideOnMobile} from "../common/H3NavHideOnMobile";
import React from "react";

export function SlideMenuImageLink({path, as, imagePath, text}) {

    return (<Link href={path} as={as}>
        <a className="px-2 md:px-3 flex">
            { imagePath ? <div className="flex items-center justify-center">
                <Image src={imagePath} width={20} height={20} unoptimized/>
            </div>: <></> }
            { text ? <H3NavHideOnMobile text={text}/>: <></> }
        </a>
    </Link>)
}