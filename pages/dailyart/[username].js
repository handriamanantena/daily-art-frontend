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

let pageSize = 2;

function Username({ username, pictures, profilePicture }) {
    const ctx = useContext(AuthContext);

    let [newPictures, setPictures] = useState(pictures)
    let [isLoading, setIsLoading] = useState(false)
    let [lastElement, setLastElement] = useState(null);
    let [pageIndex, setPageIndex] = useState(pictures[pictures.length - 1]?._id);
    let [isShowPopup, hidePopUp , showPopUp] = useShowPopUp();
    let userInfo = {
        username,
        profilePicture
    }
    let getPictures = async () => {
        setIsLoading(true)
        let response = await getPicturesByArtistUserName(username, pageSize, pageIndex);
        if(response.length > 0) {
            setPageIndex(response[response.length-1]._id);
            pictures.push(...response);
            setPictures(pictures)
            setIsLoading(false)
        }
    };

    /*


                <div className=" m-3 h-[30px] w-[30px]">
                    <ProfilePicture userInfo={userInfo}/>
                </div>
     */

   return (<BasicLayout>
                <InfiniteScroll getObjects = {getPictures} maxPage = {10} lastElement = {lastElement}>
                    <Gallery pictures = {newPictures} setLastElement = {setLastElement}>
                        {ctx.userName == username ? <AddPictureButton isShowPopup={isShowPopup} hidePopUp={hidePopUp}><StyledAddPicture showPopUp={showPopUp} text="+"/></AddPictureButton> : <Fragment></Fragment>}
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
        fallback: false, // can also be true or 'blocking'
    }
}


export async function getStaticProps(context) {
    const { params } = context;
    const username = params.username;
    let response = await getArtists(null, "profilePicture", username); //TODO we already get the information in getStaticPaths, but we can't pass it to getStaticProps. need to upgrade to next 13 to avoid 2 api calls
    console.log(JSON.stringify(response));
    const pictures = await getPicturesByArtistUserName(username, pageSize, 0);
    return {
        props: {
            pictures : pictures,
            username: username,
            profilePicture: response[0].profilePicture
        }
    }
}


export default Username;