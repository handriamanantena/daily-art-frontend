import {Fragment, useState} from "react";
import {getPicturesByPage} from "../common/api/pictures";
import {BasicLayout} from "../components/common/BasicLayout";
import {InfiniteScroll} from "../components/InfiniteScroll";
import Loading from "../components/loading/Loading";
import React from "react";
import {DailyChallengeList} from "../components/scroll/DailyChallengeList";
import {getChallengePage} from "../common/api/challenges";
import {formatDateYYYYMMDD} from "../common/Utility";
import {RocketSVG} from "../components/svg/RocketSVG";
import {CustomHeader} from "../components/common/CustomHeader";
import fs from "fs";

function Challenges ({challenges}) {
    let pageSize = process.env.NEXT_PUBLIC_PAGE_SIZE;
    let [newChallenges, setChallenges] = useState(challenges);
    let [isLoading, setIsLoading] = useState(false);
    let [lastElement, setLastElement] = useState(null);
    let [pageIndex, setPageIndex] = useState(formatDateYYYYMMDD(challenges[challenges?.length - 1]?.date));

    let getChallenges = async () => {
        console.log("challenges index" + pageIndex);
        setIsLoading(true);
        let response = await getChallengePage(pageIndex, pageSize);
        console.log("challenges" + JSON.stringify(response));
        if(response.some((challenge) => {challenge.english == challenges[challenges.length - 1].english})) {
            console.log("some: " + JSON.stringify(response));
            return;
        }
        if(response?.length > 0) {
            setPageIndex(formatDateYYYYMMDD(response[response.length-1].date));
            challenges.push(...response);
            setChallenges(challenges)
        }
        setIsLoading(false);
    }

    return (
        <BasicLayout customHeader={<CustomHeader svg={<RocketSVG/>} text="Daily Challenges"/>}>
            <InfiniteScroll getObjects = {getChallenges} lastElement={lastElement}>
                <DailyChallengeList challenges = {newChallenges} setLastElement = {setLastElement}/>
                { isLoading ? <Loading><p>Loading...</p></Loading> : <Fragment></Fragment>}
            </InfiniteScroll>
        </BasicLayout>);

}


export async function getStaticProps() {
    const challenges =  await getChallengePage(formatDateYYYYMMDD(new Date()), process.env.NEXT_PUBLIC_PAGE_SIZE);
    console.log(challenges);
    if (!fs.existsSync("./public/thumbnail")) {
        await generateThumbnails(challenges);
    }
    else {

    }
    return {
        props: {
            challenges : challenges,
        },
        revalidate: +(process.env.NEXT_PUBLIC_REVALIDATE_SEC)
    }
}

let generateThumbnails =  async (challenges) => {
    const thumbnailChallenges = challenges.map(challenge => encodeURIComponent(challenge.english));
    let dateIndex = formatDateYYYYMMDD(challenges[challenges?.length - 1]?.date);
    let newThumbnails =  await getChallengePage(formatDateYYYYMMDD(dateIndex), process.env.NEXT_PUBLIC_PAGE_SIZE);
    while(newThumbnails.length > 0) {
        dateIndex = formatDateYYYYMMDD(newThumbnails[newThumbnails?.length - 1]?.date);
        thumbnailChallenges.push(...(newThumbnails.map(challenge => challenge.english)));
        newThumbnails =  await getChallengePage(formatDateYYYYMMDD(dateIndex), process.env.NEXT_PUBLIC_PAGE_SIZE);
    }
    if (!fs.existsSync("./public/thumbnail")){
        fs.mkdirSync("./public/thumbnail");
    }

    thumbnailChallenges.forEach(async (challenge)=> {
        let image = await fetch(`${process.env.NEXT_PUBLIC_THUMBNAIL_URL}/${challenge}`);
        fs.writeFile(`./public/thumbnail/${challenge}.jpeg`, new Uint8Array(await new Response(image.body).arrayBuffer()), function (err) {
            if(err) {
                return console.log(err);
            }
            console.log("The file was saved!");
        });
    });


};

export default Challenges;