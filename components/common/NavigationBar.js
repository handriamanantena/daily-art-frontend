import React, {Fragment} from "react";
import Image from "next/image";
import Link from 'next/link'


export function NavigationBar() {

    return (<header className="flex pl-5">
        <button className="flex-none pt-2">
            <Image src="/icons/bars-solid.svg" width={24} height={24}/>
        </button>
        <Link href="/">
            <a className="px-5 flex">
                <Image src="/icons/pen-to-square-regular.svg" width={24} height={24}/>
                <h1>Daily Art</h1>
            </a>
        </Link>
        <div className="flex ml-auto">
            <button>
                Sign In
            </button>
        </div>
    </header>)
}
