import {getChallengePage, getPastEnglishChallenge} from "../../common/api/challenges";
import {formatDateYYYYMMDD} from "../../common/Utility";
import {BasicLayout} from "../../components/common/BasicLayout";
import {InfiniteScroll} from "../../components/InfiniteScroll";
import Gallery from "../../components/Gallery";
import Loading from "../../components/loading/Loading";
import {Fragment, useEffect, useState} from "react";
import React from "react";
import {getPicturesByDailyChallenge} from "../../common/api/pictures";
import {CustomHeader} from "../../components/common/CustomHeader";
import {RocketSVG} from "../../components/svg/RocketSVG";
import {useRouter} from "next/router";
import {LoadingScreen} from "../../components/loading/LoadingScreen";
import {NoPosts} from "../../components/common/NoPosts";
import {AddChallenge} from "../../components/popup/AddChallenge";
import {useShowPopUp} from "../../common/hooks/useShowPopUp";
import {PopUp} from "../../components/popup/PopUp";
import Moment from "moment";

export const Challenge = ({challenge, pictures}) => {



    let [newPictures, setPictures] = useState(pictures);
    let [isLoading, setIsLoading] = useState(false)
    let [lastElement, setLastElement] = useState(null);
    let [pageIndex, setPageIndex] = useState(pictures?.length > 0 ? pictures[pictures?.length - 1]._id : 0);
    let [date, setDate] = useState("");
    let [isShowPopup, hidePopUp , showPopUp] = useShowPopUp();

    useEffect(() => {
        setDate(Moment(challenge.date).format('YYYY年 MMM月 D日'));
    }, []);

    const router = useRouter();

    // If the page is not yet generated, this will be displayed
    // initially until getStaticProps() finishes running
    if (router.isFallback) {
        return <LoadingScreen isLoadingHidden={false}><p className="text-black">Loading...</p></LoadingScreen>
    }

    let getPictures = async () => {
        if(pageIndex == 0) {
            return;
        }
        setIsLoading(true);
        let response = await getPicturesByDailyChallenge(challenge.english + "/" + encodeURIComponent(challenge.japanese), process.env.NEXT_PUBLIC_PAGE_SIZE, pageIndex);
        if(response.length > 0) {
            setPageIndex(response[response.length-1]._id);
            pictures.push(...response);
            setPictures(pictures)
            setIsLoading(false)
        }
        setIsLoading(false)
    }

    return (
        <BasicLayout customHeader={<CustomHeader svg={<RocketSVG/>} text={"Daily Challenge: " + challenge.english + "/" + challenge.japanese} leftText={date}>
        </CustomHeader>}>
            <InfiniteScroll getObjects = {getPictures} maxPage = {10} lastElement={lastElement}>
                <Gallery pictures = {newPictures} setLastElement = {setLastElement}/>
                { isLoading ? <Loading><p>Loading...</p></Loading> : <Fragment></Fragment>}
                {<div onClick={showPopUp}>
                    <NoPosts pictures={newPictures} text="Click to add drawing"/>
                </div>}
            </InfiniteScroll>
            <PopUp isShowPopup={isShowPopup} hidePopUp={hidePopUp}>
                <AddChallenge hidePopUp={hidePopUp} word={challenge}/>
            </PopUp>
        </BasicLayout>);

}


export async function getStaticPaths() {
    let challenges = [];
    let response = ['temp'];
    let date = new Date();
    do {
        response = await getChallengePage(formatDateYYYYMMDD(date), process.env.NEXT_PUBLIC_PAGE_SIZE);
        challenges.push(...response);
        if(response.length > 0) {
            date = response[response.length - 1].date;
        }
    }
    while (response.length > 0);
    let paths = challenges.map((challenge) => {
        return {
            params: {
                challenge: encodeURIComponent(challenge.english)
            }
        }
    });
    return {
        paths: paths,
        fallback: true
    }
}

export async function getStaticProps(context) {
    const { params } = context;
    const englishChallenge = params.challenge;
    const challenge =  await getPastEnglishChallenge(encodeURIComponent(englishChallenge));
    console.log("this is the challenge " + challenge);
    if(challenge == undefined || challenge.english == undefined || challenge.date == undefined) {
        return {
            notFound: true
        };
    }
    let pictures = await getPicturesByDailyChallenge(challenge.english + "/" + encodeURIComponent(challenge.japanese), process.env.NEXT_PUBLIC_PAGE_SIZE, 0);
    console.log("challenge pictures" + JSON.stringify(pictures));
    return {
        props: {
            challenge: challenge,
            pictures: pictures
        },
        revalidate: +(process.env.NEXT_PUBLIC_REVALIDATE_SEC)
    }

}

export default Challenge;