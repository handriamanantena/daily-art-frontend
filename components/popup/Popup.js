import {Fragment} from "react";
import React from "react";
import style from "../../styles/AddPictureInfo.module.css";
import {CancelButton} from "../button/cancelButton";

export const PopUp = ({button, popup, isShowPopup, hidePopUp}) => {

    let onclick = (e) => {
        if(e.target === e.currentTarget) {
            hidePopUp();
        }
    };


    return (
        <Fragment>
            {button}
            { isShowPopup ?
                <div className={style.blurryBackground} onClick={onclick}>
                    <div className={style.popup}>
                        <div className="relative m-1">
                            <CancelButton onclick={hidePopUp}/>
                        </div>
                        {popup}
                    </div>
                </div>: <Fragment/> }
        </Fragment>
    );

}