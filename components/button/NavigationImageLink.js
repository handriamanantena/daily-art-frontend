import Image from "next/image";
import Link from "next/link";

export function NavigationImageLink({path, imagePath, text}) {

    return (<Link href={path}>
        <a className="px-5 flex">
            { imagePath ? <Image src={imagePath} width={24} height={24}/> : <></> }
            { text ? <h3 className="font-bold">{text}</h3> : <></> }
        </a>
    </Link>)
}