import {PopupForm} from "./PopupForm";
import React, {useState} from "react";
import {LoadingScreen} from "../loading/LoadingScreen";
import BasicForumInput from "../forum/inputs/input";
import {TextArea} from "../forum/inputs/TextArea";
import SubmitButton from "../forum/inputs/SubmitButton";
import Moment from "moment";

export const EditPicture = ({pictureInfo, userInfo}) => {

    let [isLoadingHidden, setIsLoadingHidden] = useState(true);
    let [errMsg, setErrMsg] = useState('');
    let date = Moment(pictureInfo.date).format('YYYY年 MMM月 D日');

    let onSubmit = (e) => {
        e.preventDefault();
        setIsLoadingHidden(false);
    };

    return <PopupForm onSubmit={onSubmit}>
        <LoadingScreen isLoadingHidden={isLoadingHidden}>
            <p className="text-black">Loading...</p>
        </LoadingScreen>
        <h1>Edit Picture</h1>
        <span className="text-gray-400 text-xs mb-5">Upload date: {date}</span>
        <p className="text-red-500">{errMsg}</p>
        <label htmlFor="title">Title</label>
        <BasicForumInput type="text" id="userName" name="userName" maxLength={32} defaultValue={pictureInfo.pictureName}/>
        <label htmlFor="tags">Tags</label>
        <TextArea id="tags" name="tags"/>
        <SubmitButton text="Submit"/>
    </PopupForm>


}