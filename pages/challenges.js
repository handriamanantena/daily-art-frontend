import {Fragment, useState} from "react";
import {getPicturesByPage} from "../common/api/pictures";
import {BasicLayout} from "../components/common/BasicLayout";
import {InfiniteScroll} from "../components/InfiniteScroll";
import Loading from "../components/loading/Loading";
import React from "react";
import {DailyChallengeList} from "../components/scroll/DailyChallengeList";
import moment from "moment";
import {getChallengePage} from "../common/api/challenges";

function Challenges ({challenges}) {
    let pageSize = process.env.NEXT_PUBLIC_PAGE_SIZE;
    let [newChallenges, setChallenges] = useState(challenges)
    let [isLoading, setIsLoading] = useState(false)
    let [lastElement, setLastElement] = useState(null);
    let [pageIndex, setPageIndex] = useState(challenges[challenges?.length - 1].date);

    let getChallenges = async () => {
        setIsLoading(true)
        let response = await getPicturesByPage(pageIndex, pageSize);
        if(response.length > 0) {
            setPageIndex(response[response.length-1]._id);
            challenges.push(...response);
            setChallenges(challenges)
        }
        setIsLoading(false);
    }

    return (
        <BasicLayout>
            <InfiniteScroll getObjects = {getChallenges} maxPage = {10} lastElement={lastElement}>
                <DailyChallengeList challenges = {newChallenges} setLastElement = {setLastElement}/>
                { isLoading ? <Loading><p>Loading...</p></Loading> : <Fragment></Fragment>}
            </InfiniteScroll>
        </BasicLayout>);

}


export async function getStaticProps() {
    const challenges =  await getChallengePage(moment(new Date()).format("YYYY-MM-DD"), process.env.NEXT_PUBLIC_PAGE_SIZE);
    return {
        props: {
            challenges : challenges,
        },
        revalidate: +(process.env.NEXT_PUBLIC_REVALIDATE_SEC)
    }
}
export default Challenges;