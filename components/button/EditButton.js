import {EditProfileSVG} from "../svg/EditProfileSVG";
import React, {Fragment} from "react";
import useShowPopUp from "../../common/hooks/useShowPopUp";
import {PopUp} from "../popup/PopUp";
import {EditProfile} from "../popup/EditProfile";

export const EditButton = ({userInfo}) => {

    const [isShowEdit, hideEdit, showEdit] = useShowPopUp();


    return <Fragment>
        <PopUp isShowPopup={isShowEdit}
                hidePopUp={hideEdit}>
            <EditProfile userInfo={userInfo}/>
        </PopUp>
        <button onClick={showEdit} className="grid grid-cols-2 content-center group md:px-3">
            <EditProfileSVG/>
            <h3 className="font-bold text-violet-500 group-hover:text-white hover:text-violet-500">Edit</h3>
        </button>
    </Fragment>
}