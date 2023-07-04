import Image from "next/dist/client/image";
import React from "react";

export const ViewPicture = ({url}) => {

    return (<div className="relative grow h-96">
        <Image className="object-cover h-full rounded-lg grow"
               layout="fill"
               src={url}
               objectPosition = "center"
               unoptimized/>
        </div>);
};