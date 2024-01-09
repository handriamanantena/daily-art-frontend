import Image from "next/dist/client/image";
import React from "react";

export const InfiniteScrollImage = ({src, onLoadingComplete}) => {
    return <Image className="object-cover h-full md:rounded-lg grow md:group-hover:brightness-50"
                  layout="fill"
                  onLoadingComplete={onLoadingComplete}
                  src={src}
                  objectPosition="center"
                  unoptimized/>

};