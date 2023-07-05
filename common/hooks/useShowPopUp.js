import {useState} from "react";

export const useShowPopUp = () => {
    const [isShowPopup, setIsShowPopup] = useState(false);

    const hidePopUp = () => {
        setIsShowPopup(false);
    };

    const showPopUp = () => {
        setIsShowPopup(true);
    };
    return [isShowPopup, hidePopUp, showPopUp];
};

export default useShowPopUp;