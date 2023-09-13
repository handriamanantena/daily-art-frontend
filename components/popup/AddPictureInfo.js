import {useEffect, useState, useContext, Fragment} from "react";
import BasicForumInput from "../forum/inputs/input";
import SubmitButton from "../forum/inputs/SubmitButton";
import React from "react";
import AuthContext from "../../common/context/auth-context";
import {useRouter} from "next/router";
import {ImageInput} from "../button/ImageInput";
import useUploadPicture from "../../common/hooks/useUploadPicture";
import {PopupForm} from "./PopupForm";

const AddPictureInfo = ({hidePopUp}) => {

    const ctx = useContext(AuthContext);
    const router = useRouter();

    const [handleSubmit, file, setFile, loadingMessage, setLoadingMessage, isLoading, setIsLoading, errorText, setErrorText] = useUploadPicture();


    useEffect(() => {
        if(!ctx.isLoggedIn) {
            router.push("/join");
        }
    }, []);

    let uploadPicture = async (e) => {
        e.preventDefault();
        let isAdded = await handleSubmit(e.target.pictureName?.value);
        if(isAdded) {
            hidePopUp();
        }
    };


    return (
            <PopupForm onSubmit={uploadPicture} encType="multipart/form-data">
                <h1>Upload Drawing</h1>
                <label htmlFor="pictureName">Title</label>
                <BasicForumInput type="text" id="pictureName" name="pictureName" maxLength="15"/>
                <ImageInput file={file} setFile={setFile} loadingMessage={loadingMessage} setLoadingMessage={setLoadingMessage}
                            isLoading={isLoading} setIsLoading={setIsLoading} errorText={errorText} setErrorText={setErrorText}/>
                <SubmitButton text="Submit"/>
            </PopupForm>);
};

export {AddPictureInfo}