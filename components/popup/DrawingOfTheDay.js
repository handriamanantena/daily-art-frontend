import {useEffect, useState} from "react";
import {getWordOfTheDay} from "../../common/api/words";

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
        <h1 className="justify-self-center">Daily drawing challenge...</h1>
        <h1 className="justify-self-center text-6xl py-5">🎨</h1>
        <h1 className="justify-self-center text-slate-400">{word.japanese}/{word.english}</h1>
    </div>
}