import React, {Fragment} from "react";
import Image from "next/image";


export function NavigationBar() {

    return (<div className="flex">
        <Image className="flex-none" src="/icons/bars-solid.svg" width={24} height={24}/>
        <h1>Daily Art</h1>
    </div>)
}
