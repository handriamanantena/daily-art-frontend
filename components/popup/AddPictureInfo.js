import {useEffect, useState, useContext} from "react";
import BasicForumInput from "../forum/inputs/input";
import SubmitButton from "../forum/inputs/SubmitButton";
import React from "react";
import AuthContext from "../../common/context/auth-context";
import {useRouter} from "next/router";
import {ImageInput} from "../button/ImageInput";
import useUploadPicture from "../../common/hooks/useUploadPicture";

const AddPictureInfo = () => {

    const ctx = useContext(AuthContext);
    const router = useRouter();

    const [handleSubmit, file, setFile, loadingMessage, setLoadingMessage, isLoading, setIsLoading, errorText, setErrorText] = useUploadPicture();


    useEffect(() => {
        if(!ctx.isLoggedIn) {
            router.push("/join");
        }
        document.body.style.overflow = "hidden";
        return () => (document.body.style.overflow = "scroll");
    }, []);

    let uploadPicture = (e) => {
        e.preventDefault();
        handleSubmit(e.target.pictureName?.value);
    };


    return (
            <form className="flex flex-grow flex-col space-y-1 md:min-w-[24rem] px-10 pt-10 pb-10 min-h-[25rem] max-h-screen max-w-fit md:max-w-none" onSubmit={uploadPicture} encType="multipart/form-data">
                <h2 className="font-extrabold">Upload Drawing</h2>
                <label htmlFor="pictureName">Title</label>
                <BasicForumInput type="text" id="pictureName" name="pictureName" maxLength="15"/>
                <ImageInput file={file} setFile={setFile} loadingMessage={loadingMessage} setLoadingMessage={setLoadingMessage}
                            isLoading={isLoading} setIsLoading={setIsLoading} errorText={errorText} setErrorText={setErrorText}/>
                <SubmitButton text="Submit"/>
            </form>);
};

export {AddPictureInfo}