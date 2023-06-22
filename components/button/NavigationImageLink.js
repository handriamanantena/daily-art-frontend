import Image from "next/image";
import Link from "next/link";
import cloudflareLoader from "../../common/image/imageLoader";

export function NavigationImageLink({path, imagePath, text}) {

    return (<Link href={path}>
        <a className="px-5 flex">
            { imagePath ? <Image src={imagePath} width={24} height={24} loader={cloudflareLoader}/> : <></> }
            { text ? <h3 className="font-bold">{text}</h3> : <></> }
        </a>
    </Link>)
}