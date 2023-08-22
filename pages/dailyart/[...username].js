import Gallery from "../../components/Gallery";
import React, {useState, useRef, useContext, Fragment} from 'react';
import {BasicLayout} from "../../components/common/BasicLayout";
import {getArtists} from "../../common/api/artists";
import {getPicturesByArtistUserName} from "../../common/api/pictures";
import {InfiniteScroll} from "../../components/InfiniteScroll"
import AuthContext from "../../common/context/auth-context";
import {StyledAddPicture} from "../../components/button/StyledAddPicture";
import {useShowPopUp} from "../../common/hooks/useShowPopUp";
import {ProfilePicture} from "../../components/picture/ProfilePicture";
import {useRouter} from "next/router";
import {ArtistNavBar} from "../../components/common/ArtistNavBar";
import {About} from "../../components/page/About";
import {PopUp} from "../../components/popup/Popup";
import {AddPictureInfo} from "../../components/popup/AddPictureInfo";

let pageSize = +(process.env.NEXT_PUBLIC_PAGE_SIZE);

function Username({ pictures, userInfo }) {
    const ctx = useContext(AuthContext);

    let [newPictures, setPictures] = useState(pictures)
    let [isLoading, setIsLoading] = useState(false)
    let [lastElement, setLastElement] = useState(null);
    let initialIndex = pictures?.length > 0 ? pictures[pictures.length - 1]?._id : null;
    let [pageIndex, setPageIndex] = useState(initialIndex);
    let [isShowPopup, hidePopUp , showPopUp] = useShowPopUp();
    let getPictures = async () => {
        console.log(JSON.stringify(userInfo))
        setIsLoading(true)
        let response = await getPicturesByArtistUserName(userInfo.userName, pageSize, pageIndex);
        if(response.length > 0) {
            setPageIndex(response[response.length-1]._id);
            pictures.push(...response);
            setPictures(pictures)
            setIsLoading(false)
        }
    };
    const router = useRouter();

    if (router.isFallback) {
        return <div>Loading...</div>
    }

    let renderPage = (query) => {
        switch(query) {
            case 'about': return <About userInfo={userInfo}/>;
            default:
            return (<InfiniteScroll getObjects={getPictures} maxPage={100} lastElement={lastElement}>
                <Gallery pictures={newPictures} setLastElement={setLastElement}>
                    {ctx.userName == userInfo.userName ?
                        <PopUp button={<StyledAddPicture showPopUp={showPopUp} text="+"/>} popup={<AddPictureInfo/>} isShowPopup={isShowPopup} hidePopUp={hidePopUp}/> : <Fragment/>}
                </Gallery>
            </InfiniteScroll>);
        }
    }

    return (
       <BasicLayout>
           <div className="flex flex-col-reverse bg-black md:h-[300px]">
               <div className="relative h-[100px] w-[100px] m-5 md:m-10">
                   <div className="ml-[110px] mt-5 grow">
                       <ProfilePicture userInfo={userInfo}/>
                       <h1 className="text-white">{userInfo.userName}</h1>
                   </div>
                   <div className="ml-[110px] flex flex-row grow">
                       <h3 className="text-white whitespace-nowrap hidden md:block">{userInfo.streak} 記録破り Record Daily Streak</h3>
                       <div className="border-l-2 border-white h-5 mx-4 hidden md:block"/>
                       <h3 className="text-white whitespace-nowrap hidden md:block">{userInfo.streak} 規律 Current Daily Streak</h3>
                   </div>
               </div>
           </div>
           <div className="grid top-0 z-50 border-b h-16 bg-white content-center flex items-center mb-10">
                <ArtistNavBar userName={userInfo.userName}/>
           </div>
           {renderPage(router.query.username[1])}
       </BasicLayout>);

}

export async function setUserNamesToParams() {
    let usernames = [];
    let response = await getArtists(null, "userName,profilePicture");
    console.log("setUserNamesToParams" + JSON.stringify(response));
    let isLastPage = false;
    while(!isLastPage) {
        usernames.push(...response);
        let initialIndex = response?.length > 0 ? response[response.length - 1]?._id : null;
        response = await getArtists(initialIndex, "userName,profilePicture");
        console.log(JSON.stringify(response));
        if(response.length == 0) {
            isLastPage = true;
        }
    }
    if(usernames) {
        return usernames.flatMap(user =>
            [{
                params: { // TODO backend should wrap response with params
                    username: [user.userName, "about"]
                },
            },
                {
                    params: { // TODO backend should wrap response with params
                        username: [user.userName, "gallery"]
                    },
                },
                {
                    params: { // TODO backend should wrap response with params
                        username: [user.userName]
                    },
                }]
        )
    }
    else return {
        params: {}
    }

}

export async function getStaticPaths() {
    let paths = await setUserNamesToParams();
    return {
        paths: paths,
        fallback: true
    }
}


export async function getStaticProps(context) {
    const { params } = context;
    const user = params.username;
    let response = await getArtists(null, null, user[0]); //TODO we already get the information in getStaticPaths, but we can't pass it to getStaticProps. need to upgrade to next 13 to avoid 2 api calls
    const pictures = await getPicturesByArtistUserName(user[0], pageSize, 0); // TODO maybe use caching to avoid getting info multiple times for each sub path
    let userInfo = response[0];
    console.log("artist by username" +JSON.stringify(response));
    //userInfo.userName = user[0];
    return {
        props: {
            pictures : pictures,
            userInfo
        },
        revalidate: +(process.env.NEXT_PUBLIC_REVALIDATE_SEC)
    }
}


export default Username;