import {EditProfileSVG} from "../svg/EditProfileSVG";
import React, {Fragment} from "react";
import useShowPopUp from "../../common/hooks/useShowPopUp";
import {PopUp2} from "../popup/Popup2";
import {EditProfile} from "../popup/EditProfile";

export const EditButton = () => {

    const [isShowEdit, hideEdit, showEdit] = useShowPopUp();


    return <Fragment>
        <PopUp2 formElements={<EditProfile/>}
                isShowPopup={isShowEdit}
                hidePopUp={hideEdit}/>
        <button onClick={showEdit} className="grid grid-cols-2 content-center group md:px-3">
            <EditProfileSVG/>
            <h3 className="font-bold text-violet-500 group-hover:text-white hover:text-violet-500">Edit</h3>
        </button>
    </Fragment>
}