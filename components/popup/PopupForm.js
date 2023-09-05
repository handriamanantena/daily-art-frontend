import React from "react";

export const PopupForm = ({onSubmit, encType, children}) => {

    return <form className="relative flex flex-col space-y-1 h-full w-full md:max-w-md lg:max-w-lg mt-1 p-10" onSubmit={onSubmit} encType={encType}>
        {children}
    </form>
}