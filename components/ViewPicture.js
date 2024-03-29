import Image from "next/dist/client/image";
import React, {Fragment, useState} from "react";
import Link from 'next/link'
import {ProfilePicture} from "./picture/ProfilePicture";
import {Options} from "./button/options/Options";
import {DropDown} from "./button/DropDown";
import {OptionsDropDown} from "./button/options/OptionsDropDown";
import {Delete} from "./svg/Delete";
import {PopUp} from "./popup/PopUp";
import {useShowPopUp} from "../common/hooks/useShowPopUp";
import {EditPicture} from "./popup/EditPicture";
import {DeletePicture} from "./popup/DeletePicture";
import {EditSVG} from "./svg/EditSVG";
import {createPicturePath} from "../common/api/pictures";
import {DailyChallengeLabel} from "./picture/DailyChallengeLabel";
import {MAX_NUMBER_CHAR_TO_DISPLAY} from "../common/Constants";
import {InfiniteScrollImage} from "./image/InfiniteScrollImage";

export const ViewPicture = ({picture, isEditable, deletePicture}) => {

    let [isLoadingComplete, setLoadingComplete] = useState(false);
    let [isShowEdit, hideEdit, showEdit] = useShowPopUp(false);
    let [isShowDelete, hideDelete, showDelete] = useShowPopUp(false);
    let picturePath = createPicturePath(picture);
    let profilePic = picture.profile[0]?.profilePicture ? picture.profile[0]?.profilePicture : "/placeholder/user-solid.svg";
    let userInfo = { userName: picture.userName, profilePicture: profilePic};

    let requestDeletePicture = (e) => {
        showDelete();
    };

    let editPicture = (e) => {
        showEdit();
    }

    let options = [{ onClick: requestDeletePicture, title: "Delete", svg: <Delete/>}, {onClick: editPicture, title: "Edit Picture", svg: <EditSVG/>}];


    return (<div className="relative grow h-96 md:ml-1 md:mr-1 mt-1 mb-1 z-49">
        <div className="flex items-center justify-center h-96 bg-gray-300 md:rounded-lg dark:bg-gray-700 group">
            <Link href={`/picture/${picturePath}`}>
                <a>
                    <InfiniteScrollImage src={picture.url} onLoadingComplete={setLoadingComplete}/>
                </a>
            </Link>
            <div className="absolute top-0 right-0 mt-3 mr-3 md:hidden" hidden={!isLoadingComplete}>
                <DailyChallengeLabel picture={picture}/>
            </div>
            <div className="hidden md:flex">
                <div className="absolute top-0 right-0 mt-3 mr-3 hidden group-hover:grid grid-cols-1 justify-items-end">
                    <Link href="/picture/[picture]" as={`/picture/${picturePath}`}>
                        <a>
                            <h2 className="text-white">{picture.pictureName.substring(0, MAX_NUMBER_CHAR_TO_DISPLAY)}</h2>
                        </a>
                    </Link>
                    <DailyChallengeLabel picture={picture}/>
                </div>
                <div className="absolute bottom-0 left-0 m-3 h-[30px] w-[30px] hidden group-hover:flex">
                    <Link href={`/dailyart/${encodeURIComponent(userInfo.userName)}`}>
                        <a className="flex flex-row">
                            <ProfilePicture profilePicture={userInfo.profilePicture}/>
                            <h3 className="text-white ml-9">{userInfo.userName}</h3>
                        </a>
                    </Link>
                </div>
            </div>
            <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true"
                 xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
            </svg>
            {isEditable ? <DropDown menuOption={<Options/>} hideDropDownArrow={true} id={picture._id}>
                    <OptionsDropDown options={options} objectId={picture._id}/>
                </DropDown> : <></>}
        </div>
        <PopUp hidePopUp={hideEdit} isShowPopup={isShowEdit}>
            <EditPicture pictureInfo={picture} hidePopUp={hideEdit}/>
        </PopUp>
        <PopUp hidePopUp={hideDelete} isShowPopup={isShowDelete}>
            <DeletePicture picture={picture} hidePopUp={hideDelete} deletePicture={deletePicture}/>
        </PopUp>
    </div>);
};