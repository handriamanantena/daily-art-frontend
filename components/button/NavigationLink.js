import Link from "next/link";
import React from "react";

export function NavigationLink({path, as, imagePath, text}) {

    return (<Link href={path} as={as}>
        <a className="px-2 md:px-3 flex">
            <h3 className="font-bold hover:text-cyan-600">{text}</h3>
        </a>
    </Link>)


}