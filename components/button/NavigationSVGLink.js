import Link from "next/link";
import React from "react";
import {H3Menu} from "../common/H3Menu";

export function NavigationSVGLink({path, as, children, text}) {

    return (<Link href={path} as={as}>
        <a className="group px-2 md:px-3 flex">
            <div className="flex items-center justify-center">
                {children}
            </div>
            <H3Menu text={text}/>
        </a>
    </Link>)
}