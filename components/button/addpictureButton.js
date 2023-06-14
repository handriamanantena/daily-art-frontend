import {Fragment, useContext, useRef, useState} from "react";
import AuthContext from "../../common/context/auth-context";
import jwt_decode from "jwt-decode";
import {AddPictureInfo} from "../forum/popup/AddPictureInfo";


export const AddPictureButton = ({}) => {
    const ctx = useContext(AuthContext);

    const [isPopUpHidden, hidePopUp] = useState(true);

    const addPicture = () => {
        hidePopUp(false);
    };

    return (
        <Fragment>
        {ctx.isLoggedIn ?
            <Fragment>
                <button onClick={addPicture} className="flex flex-col w-1/2 sm:w-3/10 lg:w-1/4 border-4 border-yellow-500 text-9xl justify-center items-center text-yellow-500 rounded-lg" title="Add Picture">+</button>
                { isPopUpHidden ? <Fragment></Fragment> : <AddPictureInfo hidePopUp={hidePopUp}/>}
            </Fragment> : <Fragment></Fragment>}
        </Fragment>
    );
};