import {Fragment, useContext, useRef, useState} from "react";
import {AddPictureInfo} from "../popup/AddPictureInfo";
import React from "react";


export const AddPictureButton = ({isShowPopup, children, hidePopUp}) => {

    return (
        <Fragment>
            {children}
            { isShowPopup ? <AddPictureInfo hidePopUp={hidePopUp}/> : <Fragment></Fragment> }
        </Fragment>
    );
};