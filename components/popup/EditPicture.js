import {PopupForm} from "./PopupForm";
import React, {useState} from "react";
import {LoadingScreen} from "../loading/LoadingScreen";
import BasicForumInput from "../forum/inputs/input";
import SubmitButton from "../forum/inputs/SubmitButton";
import Moment from "moment";
import useAxiosPrivate from "../../common/hooks/useAxiosPrivate";
import {TagInput} from "../forum/inputs/TagInput";

export const EditPicture = ({pictureInfo, userInfo}) => {

    let [isLoadingHidden, setIsLoadingHidden] = useState(true);
    let [errMsg, setErrMsg] = useState('');
    let [tagErrMsg, setTagErrMsg] = useState('');
    let date = Moment(pictureInfo.date).format('YYYY年 MMM月 D日');
    let axiosPrivate = useAxiosPrivate();
    let [listTags, setTagList] = useState(pictureInfo.tags ? pictureInfo.tags : []);

    let onSubmit = async (e) => {
        e.preventDefault();
        const host = process.env.NEXT_PUBLIC_PICTURES_API_HOST + process.env.NEXT_PUBLIC_PICTURES_API_PORT;

        setIsLoadingHidden(false);
        try {
            let body = {
                pictureName: e.target.pictureName?.value.trim(),
                tags: listTags
            }
            setIsLoadingHidden(false);
            const response = await axiosPrivate.patch(host + `/pictures/${pictureInfo._id}`, body,
                {
                    headers: {'Content-Type': 'application/json'},
                    withCredentials: true
                });
            if(response.status == 200) {
                setTimeout(async () => {
                    window.location.reload();
                    localStorage.setItem("forceReload", true);
                }, (+(process.env.NEXT_PUBLIC_REVALIDATE_SEC) * 1000) + +(process.env.NEXT_PUBLIC_RELOAD_DELAY));
            }
            else {
                setIsLoadingHidden(true);
                setErrMsg('There was a problem updating');
            }
        }
        catch (e) {
            setIsLoadingHidden(true);
            setErrMsg('There was a problem updating');
        }
    };

    return <PopupForm onSubmit={onSubmit}>
        <LoadingScreen isLoadingHidden={isLoadingHidden}>
            <p className="text-black">Loading...</p>
        </LoadingScreen>
        <h1>Edit Picture</h1>
        <span className="text-gray-400 text-xs mb-5">Upload date: {date}</span>
        <p className="text-red-500">{errMsg}</p>
        <label htmlFor="pictureName">Title</label>
        <BasicForumInput type="text" id="pictureName" name="pictureName" maxLength={32} defaultValue={pictureInfo.pictureName}/>
        <label htmlFor="tags">Tags</label>
        <TagInput id="tags" name="tags" listTags={listTags} setTagList={setTagList} objectId={pictureInfo._id} setErrMsg={setTagErrMsg}/>
        <span className="text-red-500 text-xs mb-1">{tagErrMsg}</span>
        <SubmitButton text="Submit"/>
    </PopupForm>


}