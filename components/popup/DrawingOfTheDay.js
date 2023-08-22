import {useEffect, useState} from "react";
import {getWordOfTheDay} from "../../common/api/words";
import SubmitButton from "../forum/inputs/SubmitButton";
import Label from "../forum/inputs/label";
import React from "react";

export const DrawingOftheDay = () => {

    let [word, setWord] = useState({
        english: "",
        japanese: ""
    });


    useEffect(async () => {
        let response = await getWordOfTheDay();
        setWord({
            english: response.english,
            japanese: response.japanese
        })
    }, []);


    return <div className="grid md:min-w-[24rem] px-10 pt-10 pb-10 max-h-screen max-w-fit md:max-w-none">
        <h1 className="justify-self-center">Today's daily drawing challenge...</h1>
        <h1 className="justify-self-center text-6xl py-5">🎨</h1>
        <h1 className="justify-self-center text-slate-400">{word.japanese}/{word.english}</h1>
        <form className="flex flex-col pt-5">
            <SubmitButton text="Enter Daily Challenge"/>
        </form>
    </div>
}