import {Fragment, useState} from "react";
import {getPicturesByPage} from "../common/api/pictures";
import {BasicLayout} from "../components/common/BasicLayout";
import {InfiniteScroll} from "../components/InfiniteScroll";
import Loading from "../components/loading/Loading";
import React from "react";
import {DailyChallengeList} from "../components/scroll/DailyChallengeList";
import {getChallengePage} from "../common/api/challenges";
import {formatDateYYYYMMDD} from "../common/Utility";

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
        <BasicLayout>
            <InfiniteScroll getObjects = {getChallenges} lastElement={lastElement}>
                <DailyChallengeList challenges = {newChallenges} setLastElement = {setLastElement}/>
                { isLoading ? <Loading><p>Loading...</p></Loading> : <Fragment></Fragment>}
            </InfiniteScroll>
        </BasicLayout>);

}


export async function getStaticProps() {
    const challenges =  await getChallengePage(formatDateYYYYMMDD(new Date()), process.env.NEXT_PUBLIC_PAGE_SIZE);
    console.log("getStaticProps: " + JSON.stringify(challenges));
    return {
        props: {
            challenges : challenges,
        },
        revalidate: +(process.env.NEXT_PUBLIC_REVALIDATE_SEC)
    }
}
export default Challenges;