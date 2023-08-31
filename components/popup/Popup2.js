import {Fragment, useEffect} from "react";
import React from "react";
import {CancelButton} from "../button/cancelButton";

export const PopUp2 = ({formElements, isShowPopup, hidePopUp, onSubmit, encType}) => {

    let onclick = (e) => {
        if(e.target === e.currentTarget) {
            hidePopUp();
        }
    };


    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => (document.body.style.overflow = "scroll");
    }, []);


    return (
        <Fragment>
            {isShowPopup ?
                <div className="fixed flex inset-0 backdrop-blur-sm items-center justify-center z-[1999]"
                     onClick={onclick}>

                    <form
                            className="relative flex flex-col h-full w-full shadow-slate-600 shadow-md md:h-96 md:max-w-md lg:max-w-lg"
                            onSubmit={onSubmit} encType={encType}>
                        <CancelButton onclick={hidePopUp}/>
                        <div className="flex flex-grow flex-col space-y-1 h-full w-full shadow-slate-600 shadow-md bg-white p-10">
                            <h1>title</h1>
                            {formElements}
                        </div>
                        </form>
                </div> : <Fragment/>}
        </Fragment>
    );

}