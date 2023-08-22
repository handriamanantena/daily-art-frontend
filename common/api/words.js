async function getWordOfTheDay() {
    const host = process.env.NEXT_PUBLIC_PICTURES_API_HOST + process.env.NEXT_PUBLIC_PICTURES_API_PORT;
    const res = await fetch(host + "/words/date");
    let word = await res.json();
    console.log("the word is " + JSON.stringify(word))
    return word
}

export {getWordOfTheDay}
