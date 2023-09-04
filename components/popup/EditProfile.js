import BasicForumInput from "../forum/inputs/input";
import SubmitButton from "../forum/inputs/SubmitButton";
import React, {useContext, useState} from "react";
import {PopupForm} from "./PopupForm";
import {TextArea} from "../forum/inputs/TextArea";
import AuthContext from "../../common/context/auth-context";
import {LoadingScreen} from "../loading/LoadingScreen";

export const EditProfile = ({userInfo}) => {

    let ctx = useContext(AuthContext);
    let [isLoadingHidden, setisLoadingHidden] = useState(true);
    let [loadingText, setLoadingText] = useState(true);
    let [errMsg, setErrMsg] = useState('');

    let onSubmit = async (e) => {
        e.preventDefault();
        let data = JSON.stringify({
                about: event.target.about.value,
                userName: event.target.userName.value
            });
        setisLoadingHidden(false);
        setLoadingText("Saving ...");
        const host = process.env.NEXT_PUBLIC_PICTURES_API_HOST + process.env.NEXT_PUBLIC_PICTURES_API_PORT;
        let path = host + `/artist`;
        try {
            let response = await fetch(path, {
                method: 'PATCH',
                credentials: 'include', // include, *same-origin, omit
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + ctx.token
                },
                body: data
            });
            console.log("edit response" + JSON.stringify(response));
            if (response.status == 201) {
                ctx.editUserData(await response.json());
                setTimeout(() => {
                    window.location.reload();
                }, +(process.env.NEXT_PUBLIC_REVALIDATE_SEC) * 1000);
            }
            else {
                setisLoadingHidden(true);
                setErrMsg("Unable to update")
            }
        }
        catch (e) {
            setisLoadingHidden(true);
            setErrMsg("Unable to update")
        }
    };

    return <PopupForm onSubmit={onSubmit}>
        { isLoadingHidden ? <></> : <LoadingScreen hidden={isLoadingHidden}>
            <p className="text-black">{loadingText}</p>
        </LoadingScreen> }
        <h1>Edit Profile</h1>
        <p className="text-red-500">{errMsg}</p>
        <label htmlFor="userName">User name</label>
        <BasicForumInput type="text" id="userName" name="userName" maxLength={32} defaultValue={userInfo.userName}/>
        <label htmlFor="about">About</label>
        <TextArea id="about" name="about" defaultValue={userInfo.about}/>
        <SubmitButton text="Submit"/>
    </PopupForm>

};