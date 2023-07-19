import {Fragment, useContext, useRef, useState} from "react";
import {AddPictureInfo} from "../forum/popup/AddPictureInfo";


export const AddPictureButton = ({isShowPopup, children, hidePopUp}) => {

    return (
        <Fragment>
            {children}
            { isShowPopup ? <AddPictureInfo hidePopUp={hidePopUp}/> : <Fragment></Fragment> }
        </Fragment>
    );
};