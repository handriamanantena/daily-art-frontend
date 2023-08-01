import Image from "next/image";
import Link from "next/link";
import {NavigationH3} from "../common/NavigationH3";

export function NavigationImageLink({path, imagePath, text}) {

    return (<Link href={path}>
        <a className="px-2 md:px-3 flex">
            { imagePath ? <div className="flex items-center justify-center md:hidden">
                <Image src={imagePath} width={20} height={20} unoptimized/>
            </div>: <></> }
            { text ? <NavigationH3 text={text}/>: <></> }
        </a>
    </Link>)
}