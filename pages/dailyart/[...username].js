import Gallery from "../../components/Gallery";
import React, {useState, useContext, Fragment, useEffect} from 'react';
import {BasicLayout} from "../../components/common/BasicLayout";
import {getArtists} from "../../common/api/artists";
import {InfiniteScroll} from "../../components/InfiniteScroll"
import AuthContext from "../../common/context/auth-context";
import {StyledAddPicture} from "../../components/button/StyledAddPicture";
import {useShowPopUp} from "../../common/hooks/useShowPopUp";
import {ProfilePicture} from "../../components/picture/ProfilePicture";
import {useRouter} from "next/router";
import {ArtistNavBar} from "../../components/common/ArtistNavBar";
import {About} from "../../components/page/About";
import {AddPictureInfo} from "../../components/popup/AddPictureInfo";
import {EditButton} from "../../components/button/EditButton";
import {PopUp} from "../../components/popup/PopUp";
import Loading from "../../components/loading/Loading";
import {getPicturesByArtistUserName} from "../../common/api/pictures";
import {NoPosts} from "../../components/common/NoPosts";
let pageSize = +(process.env.NEXT_PUBLIC_PAGE_SIZE);
let maxPage = 100;

function Username({ userInfo }) {
    const ctx = useContext(AuthContext);

    let [isLoading, setIsLoading] = useState(false);

    let [newPictures, setPictures] = useState([]);

    let [lastElement, setLastElement] = useState(null);
    let [pageIndex, setPageIndex] = useState(0);
    let [isShowPopup, hidePopUp , showPopUp] = useShowPopUp();

    useEffect(async () => {
        let pictures = await getPicturesByArtistUserName(userInfo.userName, pageSize, 0);

        if(pictures) {
            setPictures([...pictures]);
            setPageIndex(pictures[pictures.length-1]._id);
        }
    }, []);

    const router = useRouter();

    if (router.isFallback) {
        return <div>Loading...</div>
    }

    let getPictures = async () => {
        setIsLoading(true);
        let response;
        response = await getPicturesByArtistUserName(userInfo.userName, pageSize, pageIndex, setIsLoading);
        if(response.length > 0) {
            setPageIndex(response[response.length-1]._id);
            newPictures.push(...response);
            setPictures([...newPictures])
        }
        setIsLoading(false)
    };

    let pictureDeleted = (deleteId) => {
        setIsLoading(true);
        setPictures((newPictures) => newPictures.filter((picture) => picture._id != deleteId));
        setIsLoading(false);
    }

    let renderPage = (query) => {
        switch(query) {
            case 'about': return <About userInfo={userInfo}/>;
            default:
            return (<InfiniteScroll getObjects={getPictures} maxPage={maxPage} lastElement={lastElement}>
                <Gallery pictures={newPictures} setLastElement={setLastElement} isEditable={userInfo.userName == ctx.userName} deletePicture={pictureDeleted}>
                    {ctx.isAuthorized(userInfo.userName) ?
                        <StyledAddPicture showPopUp={showPopUp} text="+"/> : <NoPosts pictures={newPictures}/>}
                </Gallery>
                { isLoading ? <Loading><p>Loading...</p></Loading> : <Fragment></Fragment>}
                <PopUp isShowPopup={isShowPopup} hidePopUp={hidePopUp}>
                    <AddPictureInfo hidePopUp={hidePopUp}/>
                </PopUp>
            </InfiniteScroll>);
        }
    }

    return (
       <BasicLayout>
           <div className="flex flex-col-reverse bg-black md:h-[300px]">
               <div className="relative m-5 md:m-10">
                   <div className="flex mt-5 grow">
                       <div className="relative h-[100px] w-[100px]">
                            <ProfilePicture profilePicture={userInfo.profilePicture}/>
                       </div>
                       <div className="self-center ml-2">
                           <div className="md:flex self-center">
                               <h1 className="text-white">{userInfo.userName}</h1>
                               {ctx.isAuthorized(userInfo.userName) ?
                               <EditButton userInfo={userInfo}/> : <></>}
                           </div>
                           <div className="flex flex-row grow">
                               <h3 className="text-white whitespace-nowrap hidden md:block">{userInfo.streak} 記録破り Record Daily Streak</h3>
                               <div className="border-l-2 border-white h-5 mx-4 hidden md:block"/>
                               <h3 className="text-white whitespace-nowrap hidden md:block">{userInfo.streak} 規律 Current Daily Streak</h3>
                           </div>
                       </div>
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
    console.log("artist by username" +JSON.stringify(response));
    if(response.length == 0) {
        return {
            notFound: true
        };
    }
    let userInfo = response[0];
    //userInfo.userName = user[0];
    return {
        props: {
            userInfo
        },
        revalidate: +(process.env.NEXT_PUBLIC_REVALIDATE_SEC)
    }
}


export default Username;