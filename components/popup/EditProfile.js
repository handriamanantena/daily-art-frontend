import BasicForumInput from "../forum/inputs/input";
import SubmitButton from "../forum/inputs/SubmitButton";
import React from "react";
import {PopupForm} from "./PopupForm";

export const EditProfile = ({userInfo}) => {


    let onSubmit = () => {

    };

    return <PopupForm onSubmit={onSubmit}>
        <h1>Edit Profile</h1>
        <label htmlFor="userName">User name</label>
        <BasicForumInput type="text" id="userName" name="userName" defaultValue={userInfo.userName}/>
        <label htmlFor="about">About</label>
        <textarea className="grow h-auto md:h-96 bg-slate-200 mw-80" defaultValue={userInfo.about}/>
        <SubmitButton text="Submit"/>
    </PopupForm>

};