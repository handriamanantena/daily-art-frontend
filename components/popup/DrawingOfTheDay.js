import {Fragment, useContext, useEffect, useState} from "react";
import {getWordOfTheDay} from "../../common/api/words";
import SubmitButton from "../forum/inputs/SubmitButton";
import React from "react";
import Loading from "../loading/Loading";
import {ImageInput} from "../button/ImageInput";
import useUploadPicture from "../../common/hooks/useUploadPicture";
import AuthContext from "../../common/context/auth-context";
import {Button} from "../button/Button";
import { useRouter } from 'next/router'
import BasicForumInput from "../forum/inputs/input";

export const DrawingOftheDay = () => {

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
        let response = await getWordOfTheDay();
        setLoadingWord(false);
        setWord({
            english: response.english,
            japanese: response.japanese
        })
    }, []);

    let joinUs = () => {
        router.push("/join");
    }

    let uploadPicture = (e) => {
        e.preventDefault();
        handleSubmit(e.target.pictureName?.value, word.english);
    }

    return <div className="flex flex-grow flex-col space-y-1 md:min-w-[24rem] px-10 pt-10 pb-10 max-w-fit md:max-w-none">
        <h2 className="font-extrabold mb-5">Daily Challenge 🚀</h2>
        <p>Today&apos;s Drawing Challenge:</p>
        <div className="grid">
            {isLoadingWord || word.english == undefined || word.japanese == undefined ? <Loading></Loading> : <h1 className="justify-self-center">{word.english}/{word.japanese}</h1>}
            {ctx.isLoggedIn ?
                <Fragment>
                    <form className="flex flex-col space-y-1" onSubmit={uploadPicture} encType="multipart/form-data">
                        <label htmlFor="pictureName">Title</label>
                        <BasicForumInput type="text" id="pictureName" name="pictureName" maxLength="15"/>
                        <div className="flex min-h-[174px]">
                            <ImageInput file={file} setFile={setFile} loadingMessage={loadingMessage}
                                        setLoadingMessage={setLoadingMessage}
                                        isLoading={isLoading} setIsLoading={setIsLoading} errorText={errorText}
                                        setErrorText={setErrorText}/>
                        </div>
                        <SubmitButton text="Submit"/>
                    </form>
                </Fragment> : <Button onclick={joinUs} text="Join Us"/>}
        </div>
    </div>
}