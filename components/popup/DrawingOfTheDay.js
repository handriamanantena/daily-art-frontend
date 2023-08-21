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


    return <div className="grid md:min-w-[24rem] px-10 pt-10 pb-10 min-h-[25rem] max-h-screen max-w-fit md:max-w-none">
        <h1 className="justify-self-center">Today we are drawing</h1>
        <h1 className="justify-self-center">{word.japanese}/{word.english}</h1>
    </div>
}