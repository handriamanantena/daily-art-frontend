import Image from "next/dist/client/image";
import React from "react";

export const ViewPicture = ({url}) => {

    return (<div className="relative h-96">
        <Image className="object-cover rounded-lg h-96"
               src={url}
               layout="fill"
               unoptimized/>
        </div>);
};