import {useEffect, useState, useRef} from "react";
import BasicForumInput from "../inputs/input";
import SubmitButton from "../inputs/SubmitButton";
import style from "../../../styles/AddPictureInfo.module.css";
import React from "react";
import Image from "next/dist/client/image";
import {CancelButton} from "../../button/cancelButton";

const AddPictureInfo = ({onSubmit, method, hidePopUp}) => {


    let ref = useRef();
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => (document.body.style.overflow = "scroll");
    });

    const [file, setFile] = useState("");
    const [fileDataURL, setFileDataURL] = useState("");

    const handleFileChange = (e) => {
        const files = (e.target).files

        if (files && files.length > 0) {
            setFile(files[0])
            setFileDataURL(files[0].mozFullPath)
        }
    };


    useEffect(() => {
        let fileReader, isCancel = false;
        if (file) {
            fileReader = new FileReader();
            fileReader.onload = (e) => {
                const { result } = e.target;
                if (result && !isCancel) {
                    setFileDataURL(result)
                }
            };
            fileReader.readAsDataURL(file);
        }
        return () => {
            isCancel = true;
            if (fileReader && fileReader.readyState === 1) {
                fileReader.abort();
            }
        }

    }, [file]);

    let onclick = (e) => {
        e.preventDefault();
        if(e.target === e.currentTarget) {
            hidePopUp(true)
        }
    };

    return (<div className={style.blurryBackground} onClick={onclick} ref={ref}>
        <div className={style.popup}>
            <div className="relative">
                <CancelButton onclick={hidePopUp}/>
            </div>
            <form className="flex flex-grow flex-col space-y-1 w-96 px-10 pt-10 pb-10 min-h-[25rem]" onSubmit={onSubmit} method={method} encType="multipart/form-data">
                <h2 className="font-extrabold">Create DailyArt</h2>
                <label htmlFor="pictureName">Title</label>
                <BasicForumInput type="text" id="pictureName" name="pictureName"/>
                <label htmlFor="file">Add Drawing</label>
                <input id="file" type="file" onChange={handleFileChange} accept="image/*"/>
                {fileDataURL ? <img src={fileDataURL}/> : <div className="flex flex-grow justify-center bg-slate-100">
                    <Image src="/icons/palette-solid.svg" width={24} height={24}/>
                </div>}
                <SubmitButton text="Add Picture"/>
            </form>
        </div>
        </div>);
}

export {AddPictureInfo}