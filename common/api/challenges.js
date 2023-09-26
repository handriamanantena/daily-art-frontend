async function getChallengeOfTheDay() {
    const host = process.env.NEXT_PUBLIC_PICTURES_API_HOST + process.env.NEXT_PUBLIC_PICTURES_API_PORT;
    const res = await fetch(host + "/challenges/date");
    let word = await res.json();
    console.log("the challenge is " + JSON.stringify(word))
    return word
}

async function getChallengePage(dateIndex, pageSize) {
    let query = "?";
    if (pageSize) {
        query += "pageSize=" + pageSize;
        if (dateIndex) {
            query += "&pageIndex=" + dateIndex;
        }
    }
    const host = process.env.NEXT_PUBLIC_PICTURES_API_HOST + process.env.NEXT_PUBLIC_PICTURES_API_PORT
    const res = await fetch(host + "/challenges" + query);
    console.log(JSON.stringify(res));
    return await res.json();
}

async function getEnglishChallenge(englishChallenge) {
    const host = process.env.NEXT_PUBLIC_PICTURES_API_HOST + process.env.NEXT_PUBLIC_PICTURES_API_PORT
    const res = await fetch(host + "/challenges/" + englishChallenge);
    return await res.json();
}



export {getChallengeOfTheDay, getChallengePage, getEnglishChallenge}
