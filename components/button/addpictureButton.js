import {Fragment, useContext, useRef, useState} from "react";
import AuthContext from "../../common/context/auth-context";
import jwt_decode from "jwt-decode";
import {AddPictureInfo} from "../forum/popup/AddPictureInfo";


export const AddPictureButton = ({isPopUpHidden, children, hidePopUp}) => {
    const ctx = useContext(AuthContext);

    return (
        <Fragment>
        {true ?
            <Fragment>
                {children}
                { isPopUpHidden ? <Fragment></Fragment> : <AddPictureInfo hidePopUp={hidePopUp}/>}
            </Fragment> : <Fragment></Fragment>}
        </Fragment>
    );
};