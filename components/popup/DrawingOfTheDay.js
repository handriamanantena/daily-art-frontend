import {Fragment, useContext, useEffect, useState} from "react";
import {getWordOfTheDay} from "../../common/api/words";
import SubmitButton from "../forum/inputs/SubmitButton";
import Label from "../forum/inputs/label";
import React from "react";
import BasicForumInput from "../forum/inputs/input";
import {default as NextImage} from "next/future/image";
import Loading from "../loading/Loading";
import {ImageInput} from "../button/ImageInput";
import useUploadPicture from "../../common/hooks/useUploadPicture";
import AuthContext from "../../common/context/auth-context";
import {Button} from "../button/Button";
import { useRouter } from 'next/router'

export const DrawingOftheDay = () => {

    let ctx = useContext(AuthContext);
    let router = useRouter();

    let [word, setWord] = useState({
        english: "",
        japanese: ""
    });

    const [handleSubmit, file, setFile, loadingMessage, setLoadingMessage, isLoading, setIsLoading, errorText, setErrorText] = useUploadPicture();

    useEffect(async () => {
        let response = await getWordOfTheDay();
        setWord({
            english: response.english,
            japanese: response.japanese
        })
    }, []);

    let joinUs = () => {
        router.push("/join");
    }


    return <div
        className="flex flex-grow flex-col space-y-1 md:min-w-[24rem] px-10 pt-10 pb-10 max-w-fit md:max-w-none">
        <h2 className="font-extrabold mb-5">Daily Challenge 🚀</h2>
        <p className="justify-self-center">Today's Drawing Challenge:</p>
        <h1 className="justify-self-center ">{word.english}/{word.japanese}</h1>

        {ctx.isLoggedIn ?
            <Fragment>
                <div className="flex min-h-[174px]">
                    <ImageInput file={file} setFile={setFile} loadingMessage={loadingMessage}
                                setLoadingMessage={setLoadingMessage}
                                isLoading={isLoading} setIsLoading={setIsLoading} errorText={errorText}
                                setErrorText={setErrorText}/>
                </div>

                <form className="flex flex-col" onSubmit={handleSubmit} encType="multipart/form-data">
                    <SubmitButton text="Submit"/>
                </form>
            </Fragment> : <Button onclick={joinUs} text="Join Us"/>}
    </div>
}