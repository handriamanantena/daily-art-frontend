import {useEffect, useState, useContext, Fragment} from "react";
import BasicForumInput from "../forum/inputs/input";
import SubmitButton from "../forum/inputs/SubmitButton";
import React from "react";
import AuthContext from "../../common/context/auth-context";
import {useRouter} from "next/router";
import {ImageInput} from "../button/ImageInput";
import useUploadPicture from "../../common/hooks/useUploadPicture";
import {PopupForm} from "./PopupForm";

const AddPictureInfo = () => {

    const ctx = useContext(AuthContext);
    const router = useRouter();

    const [handleSubmit, file, setFile, loadingMessage, setLoadingMessage, isLoading, setIsLoading, errorText, setErrorText] = useUploadPicture();


    useEffect(() => {
        if(!ctx.isLoggedIn) {
            router.push("/join");
        }
    }, []);

    let uploadPicture = (e) => {
        e.preventDefault();
        handleSubmit(e.target.pictureName?.value);
    };


    return (
            <PopupForm onSubmit={uploadPicture} encType="multipart/form-data">
                <h1>Upload Drawing</h1>
                <label htmlFor="pictureName">Title</label>
                <BasicForumInput type="text" id="pictureName" name="pictureName" maxLength="15"/>
                <div className="flex min-h-[174px]">
                    <ImageInput file={file} setFile={setFile} loadingMessage={loadingMessage} setLoadingMessage={setLoadingMessage}
                            isLoading={isLoading} setIsLoading={setIsLoading} errorText={errorText} setErrorText={setErrorText}/>
                </div>
                <SubmitButton text="Submit"/>
            </PopupForm>);
};

export {AddPictureInfo}