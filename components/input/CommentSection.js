import Image from "next/image";
import React from "react";

export const CommentSection = () => {

    return <div className="ml-[10px] md:max-w-screen-md md:min-w-[768px]">
        <div className="flex flex-row">
            <button className="flex flex-row pt-[10px]">
                <p className="mr-[5px]">6</p>
                <Image src="/icons/chat.svg" alt="Comment" width={24} height={24} unoptimized/>
                <p className="text-[0px] md:text-[16px] md:visible ml-[5px]">Comment</p>
            </button>
            <div className="flex flex-row-reverse grow">
                <button disabled={true} className="flex flex-row pt-[10px]">
                    <p className="text-[0px] md:text-[16px] mr-[5px]">Views</p>
                    <Image src="/icons/eye-fill.svg" width={24} height={24} unoptimized/>
                </button>
                <button className="pr-[5px] pt-[10px]">
                    <Image src="/icons/trophy-fill.svg" alt="Award" width={24} height={24} unoptimized/>
                </button>
            </div>
        </div>
        <form className="flex flex-col">
            <label>Comments</label>
            <textarea className="ml-10 h-[80px] bg-slate-200 mw-80"/>
        </form>
    </div>
}