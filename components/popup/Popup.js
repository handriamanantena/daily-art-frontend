import {Fragment, useEffect} from "react";
import React from "react";
import {CancelButton} from "../button/cancelButton";

export const PopUp = ({children, isShowPopup, hidePopUp, onSubmit, encType}) => {

    let onclick = (e) => {
        if(e.target === e.currentTarget) {
            hidePopUp();
        }
    };


    useEffect(() => {
        if(isShowPopup) {
            document.body.style.overflow = "hidden";
        }
        return () => (document.body.style.overflow = "scroll");
    }, [isShowPopup]);


    return (
        <Fragment>
            {isShowPopup ?
                <div className="fixed flex inset-0 backdrop-blur-sm items-center justify-center z-[1999]"
                     onClick={onclick}>

                    <div className="relative flex flex-col h-full w-full shadow-slate-600 shadow-md md:h-auto md:max-w-md lg:max-w-lg bg-white"
                         onSubmit={onSubmit} encType={encType}>
                        <CancelButton onclick={hidePopUp}/>
                        {children}
                    </div>
                </div> : <Fragment/>}
        </Fragment>
    );

}