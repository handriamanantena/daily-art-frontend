import {Fragment, useState} from "react";
import {BasicLayout} from "../components/common/BasicLayout";
import {InfiniteScroll} from "../components/InfiniteScroll";
import Loading from "../components/loading/Loading";
import React from "react";
import {getChallengeOfTheDay, getChallengePage} from "../common/api/challenges";
import {formatDateYYYYMMDD} from "../common/Utility";
import {RocketSVG} from "../components/svg/RocketSVG";
import {CustomHeader} from "../components/common/CustomHeader";
import fs from "fs";
import Gallery from "../components/Gallery";

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
                <Gallery pictures = {newChallenges} setLastElement = {setLastElement}/>
                { isLoading ? <Loading><p>Loading...</p></Loading> : <Fragment></Fragment>}
            </InfiniteScroll>
        </BasicLayout>);

}


export async function getStaticProps() {
    const challenges =  await getChallengePage(formatDateYYYYMMDD(new Date()), process.env.NEXT_PUBLIC_PAGE_SIZE);
    console.log(challenges);
    await generateThumbnails(challenges);
    return {
        props: {
            challenges : challenges,
        },
        revalidate: +(process.env.NEXT_PUBLIC_REVALIDATE_SEC)
    }
}

let generateThumbnails =  async (challenges) => {
    const thumbnailChallenges = challenges.reduce((result, challenge) => {
        console.log("checking if file exists");
        let exist = fs.existsSync(`./public/thumbnail/${challenge}.jpeg`);
        if (!exist) {
            result.push(encodeURIComponent(challenge.english))
        }
        return result;
    }, []);
    let dateIndex = formatDateYYYYMMDD(challenges[challenges?.length - 1]?.date);
    let newThumbnails =  await getChallengePage(formatDateYYYYMMDD(dateIndex), process.env.NEXT_PUBLIC_PAGE_SIZE);
    while(newThumbnails.length > 0) {
        dateIndex = formatDateYYYYMMDD(newThumbnails[newThumbnails?.length - 1]?.date);
        thumbnailChallenges.push(...(newThumbnails.map(challenge => challenge.english)));
        newThumbnails =  await getChallengePage(formatDateYYYYMMDD(dateIndex), process.env.NEXT_PUBLIC_PAGE_SIZE);
    }
    console.log("thumbnails to be added " + JSON.stringify(thumbnailChallenges));
    if (!fs.existsSync("./public/thumbnail")){
        fs.mkdirSync("./public/thumbnail");
    }
    thumbnailChallenges.forEach(async (challenge) => {
        console.log("moving challenge " + challenge)
        await moveThumbnailToDir(challenge);
    })
};

let moveThumbnailToDir = async (challenge) => {
    let image = await fetch(`${process.env.NEXT_PUBLIC_THUMBNAIL_URL}/${challenge}`);
    console.log("r2 response" + image.status);
    if(image.status == 200) {
        try {
            console.log("moving challenge to ./public: " + challenge)
            fs.writeFileSync(`./public/thumbnail/${challenge}.jpeg`, new Uint8Array(await new Response(image.body).arrayBuffer()));
            console.log("The file was saved!");
        }
        catch(e) {
            console.log(e);
        }
    }
    else {
        console.log("could not get image " + image.status + " " + image.body);
    }

};

export default Challenges;