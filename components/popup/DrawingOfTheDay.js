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


    return <div>
        <p>{JSON.stringify(word)}</p>
    </div>
}