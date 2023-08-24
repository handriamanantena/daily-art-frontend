import Image from "next/image";
import React from "react";

export const NavigationImage = ({image}) => {

    return <div className="md:hidden flex items-center justify-center">
        <Image className="object-cover h-full rounded-md"
               width={20}
               height={20}
               src={image}
               unoptimized/>
    </div>;
}