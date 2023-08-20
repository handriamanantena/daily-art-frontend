import {Fragment} from "react";
import React from "react";

export const PopUp = ({button, popup, isShowPopup}) => {

    return (
        <Fragment>
            {button}
            { isShowPopup ? popup : <Fragment/> }
        </Fragment>
    );

}