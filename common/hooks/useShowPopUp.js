import {useState} from "react";

export const useShowPopUp = (initial) => {
    const [isShowPopup, setIsShowPopup] = useState(!!initial);

    const hidePopUp = () => {
        setIsShowPopup(false);
    };

    const showPopUp = () => {
        setIsShowPopup(true);
    };
    return [isShowPopup, hidePopUp, showPopUp];
};

export default useShowPopUp;