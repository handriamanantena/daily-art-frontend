import Gallery from "../../components/Gallery";
import React, {useState, useRef, useContext, Fragment} from 'react';
import dailyArt from '../../styles/DailyArt.module.css';
import {BasicLayout} from "../../components/common/BasicLayout";
import {getArtists} from "../../common/api/artists";
import {getPicturesByArtistUserName} from "../../common/api/pictures";
import {InfiniteScroll} from "../../components/InfiniteScroll"
import {AddPictureButton} from "../../components/button/addpictureButton";
import AuthContext from "../../common/context/auth-context";
import {StyledAddPicture} from "../../components/button/StyledAddPicture";
import {useShowPopUp} from "../../common/hooks/useShowPopUp";
import {ProfilePicture} from "../../components/picture/ProfilePicture";
import Image from "next/future/image";

let pageSize = 2;

function Username({ pictures, userInfo }) {
    const ctx = useContext(AuthContext);

    let [newPictures, setPictures] = useState(pictures)
    let [isLoading, setIsLoading] = useState(false)
    let [lastElement, setLastElement] = useState(null);
    let [pageIndex, setPageIndex] = useState(pictures[pictures.length - 1]?._id);
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

   return (
       <BasicLayout>
           <div className="flex flex-col-reverse bg-black h-[300px] mb-3 p-10">
               <h3 className="text-white whitespace-nowrap mt-5">{userInfo.about}</h3>
               <p className="text-gray-400 whitespace-nowrap mt-5">My Bio</p>
               <div className="relative h-[100px] w-[100px]">
                   <div className="ml-[110px] mt-5 grow">
                       <ProfilePicture userInfo={userInfo}/>
                       <h1 className="text-white">{userInfo.userName}</h1>
                   </div>
                   <div className="ml-[110px] flex flex-row grow">
                       <h3 className="text-white whitespace-nowrap">{userInfo.streak} 記録破り Record Daily Streak</h3>
                       <div className="border-l-2 border-white h-5 mx-4"/>
                       <h3 className="text-white whitespace-nowrap">{userInfo.streak} 規律 Current Daily Streak</h3>
                   </div>
               </div>
           </div>
           <InfiniteScroll getObjects={getPictures} maxPage={10} lastElement={lastElement}>
               <Gallery pictures={newPictures} setLastElement={setLastElement}>
                   {ctx.userName == userInfo.userName ?
                       <AddPictureButton isShowPopup={isShowPopup} hidePopUp={hidePopUp}><StyledAddPicture
                           showPopUp={showPopUp} text="+"/></AddPictureButton> : <Fragment></Fragment>}
               </Gallery>
           </InfiniteScroll>
       </BasicLayout>);

}

export async function setUserNamesToParams() {
    let usernames = [];
    let response = await getArtists(null, "userName,profilePicture");
    console.log(JSON.stringify(response));
    let isLastPage = false;
    while(!isLastPage) {
        usernames.push(...response);
        response = await getArtists(usernames[0]._id, "userName,profilePicture");
        console.log(JSON.stringify(response));
        if(response.length == 0) {
            isLastPage = true;
        }
    }
    if(usernames) {
        return usernames.map(user => {
            return {
                params: { // TODO backend should wrap response with params
                    username: user.userName
                },
            }
        })
    }
    else return {
        params: {}
    }

}

export async function getStaticPaths() {
    let paths = await setUserNamesToParams();
    console.log(paths);
    return {
        paths: paths,
        fallback: true
    }
}


export async function getStaticProps(context) {
    const { params } = context;
    const username = params.username;
    let response = await getArtists(null, null, username); //TODO we already get the information in getStaticPaths, but we can't pass it to getStaticProps. need to upgrade to next 13 to avoid 2 api calls
    console.log("last get artist" +JSON.stringify(response));
    const pictures = await getPicturesByArtistUserName(username, pageSize, 0);
    let userInfo = response[0];
    userInfo.userName = username;
    return {
        props: {
            pictures : pictures,
            userInfo
        }
    }
}


export default Username;