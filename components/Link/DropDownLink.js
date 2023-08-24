import Link from "next/link";
import React from "react";

export function DropDownLink({path, as, imagePath, text}) {

    return (<Link href={path} as={as}>
        <a className="flex">
            <h3 className="font-bold text-white">{text}</h3>
        </a>
    </Link>)


}