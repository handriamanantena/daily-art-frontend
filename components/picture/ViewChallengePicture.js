import Image from "next/dist/client/image";
import React from "react";
import Link from "next/link";
import {MAX_NUMBER_CHAR_TO_DISPLAY} from "../../common/Constants";
import {InfiniteScrollImage} from "../image/InfiniteScrollImage";

export const ViewChallengePicture = ({challenge}) => {
    return <div className="relative grow h-96 md:ml-1 md:mr-1 mt-1 mb-1 z-49">
        <div className="flex items-center justify-center h-96 bg-gray-300 md:rounded-lg dark:bg-gray-700 group">
        <Link href={`/challenge/${challenge.english}`}>
            <a>
                <InfiniteScrollImage src={`${process.env.NEXT_PUBLIC_THUMBNAIL_URL}/${decodeURIComponent(challenge.english)}`} />
            </a>
        </Link>
        <div className="absolute top-0 right-0 mt-3 mr-3 hidden group-hover:grid grid-cols-1 justify-items-end">
            <Link href={`/challenge/${challenge.english}`}>
                <a>
                    <h2 className="text-white">{challenge.english.substring(0, MAX_NUMBER_CHAR_TO_DISPLAY)}</h2>
                </a>
            </Link>
        </div>
        <svg className="w-10 h-10 text-gray-200 dark:text-gray-600 " aria-hidden="true"
             xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
            <path
                d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
        </svg>
    </div>
    </div>
};