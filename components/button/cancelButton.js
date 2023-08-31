import Image from "next/dist/client/image";
import React from "react";

const CancelButton = ({onclick}) => {

    return (<div className="hover:bg-blue-500 rounded-full w-6 h-6 md:m-3 absolute top-0 right-0 m-5 z-50" onClick={onclick}>
        <Image src="/icons/xmark-solid.svg" width={24} height={24} unoptimized/>
    </div>);

}

export {CancelButton}