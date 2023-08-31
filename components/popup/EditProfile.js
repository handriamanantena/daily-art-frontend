import {Fragment} from "react";
import BasicForumInput from "../forum/inputs/input";
import SubmitButton from "../forum/inputs/SubmitButton";
import React from "react";

export const EditProfile = ({}) => {

    return <Fragment>
        <label htmlFor="userName">User name</label>
        <BasicForumInput type="text" id="userName" name="userName" maxLength="15"/>
        <label htmlFor="about">About</label>
        <textarea className="ml-10 h-[80px] bg-slate-200 mw-80"/>
        <SubmitButton text="Submit"/>
    </Fragment>

};