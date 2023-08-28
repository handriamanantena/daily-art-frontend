import React, {useEffect} from "react";
import Image from "next/image";

export const NavigationBar = ({children}) => {
    useEffect(async () => {
        const init = async () => {
            const { Sidenav, initTE } = await import("tw-elements");
            initTE({ Sidenav });
        };
        await init();
    }, []);


    return <div id="sidenav" className="flex pl-5 items-center" data-te-sidenav-init>
        <button className="flex-none pt-2"
                type="button"
                data-te-sidenav-toggle-ref
                data-te-target="#sidenav">
            <Image src="/icons/bars-solid.svg" width={24} height={24} unoptimized/>
        </button>
            {children}
        </div>
}