import {Fragment, useContext, useEffect, useState} from "react";
import {getChallengeOfTheDay} from "../../common/api/challenges";
import SubmitButton from "../forum/inputs/SubmitButton";
import React from "react";
import Loading from "../loading/Loading";
import {ImageInput} from "../button/ImageInput";
import useUploadPicture from "../../common/hooks/useUploadPicture";
import AuthContext from "../../common/context/auth-context";
import {Button} from "../button/Button";
import { useRouter } from 'next/router'
import BasicForumInput from "../forum/inputs/input";
import {PopupForm} from "./PopupForm";
import {MAX_PICTURE_NAME_SIZE} from "../../common/Constants";

export const DrawingOftheDay = ({hidePopUp}) => {

    let ctx = useContext(AuthContext);
    let [isLoadingWord, setLoadingWord] = useState(true);
    let router = useRouter();

    let [word, setWord] = useState({
        english: undefined,
        japanese: undefined
    });

    const [handleSubmit, file, setFile, loadingMessage, setLoadingMessage, isLoading, setIsLoading, errorText, setErrorText] = useUploadPicture();

    useEffect(async () => {
        setLoadingWord(true);
        let response = await getChallengeOfTheDay();
        setLoadingWord(false);
        setWord({
            english: response.english,
            japanese: response.japanese
        })
    }, []);

    let joinUs = () => {
        router.push("/join");
    }

    let uploadPicture = async (e) => {
        e.preventDefault();
        let isAdded = await handleSubmit(e.target.pictureName?.value, word.english + "/" + word.japanese);
        if(isAdded) {
            hidePopUp();
        }
    }

    return <PopupForm onSubmit={uploadPicture} encType="multipart/form-data">
        <h1>Daily Challenge 🚀</h1>
        <p>Today&apos;s Drawing Challenge:</p>
        <div className="flex flex-col grow space-y-1">
            {isLoadingWord || word.english == undefined || word.japanese == undefined ? <Loading></Loading> : <h1 className="flex justify-center">{word.english}/{word.japanese}</h1>}
            {ctx.isLoggedIn ?
                <Fragment>
                        <label htmlFor="pictureName">Title</label>
                        <BasicForumInput type="text" id="pictureName" name="pictureName" maxLength={MAX_PICTURE_NAME_SIZE}/>
                        <ImageInput file={file} setFile={setFile} loadingMessage={loadingMessage}
                                        setLoadingMessage={setLoadingMessage}
                                        isLoading={isLoading} setIsLoading={setIsLoading} errorText={errorText}
                                        setErrorText={setErrorText}/>
                        <SubmitButton text="Submit"/>
                </Fragment> : <Button onclick={joinUs} text="Join Us"/>}
        </div>
    </PopupForm>
}