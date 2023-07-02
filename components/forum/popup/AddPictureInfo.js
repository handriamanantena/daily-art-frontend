import {useEffect, useState, useContext} from "react";
import BasicForumInput from "../inputs/input";
import SubmitButton from "../inputs/SubmitButton";
import style from "../../../styles/AddPictureInfo.module.css";
import React from "react";
import Image from "next/dist/client/image";
import {CancelButton} from "../../button/cancelButton";
import AuthContext from "../../../common/context/auth-context";
import {uploadImage} from "../../../common/image/UploadImage";
import {uploadImageToCloudflare} from "../../../common/api/cloudflare/workers";

const AddPictureInfo = ({onSubmit, method, hidePopUp}) => {

    const ctx = useContext(AuthContext);
    const [file, setFile] = useState("");
    const [fileDataURL, setFileDataURL] = useState("");

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => (document.body.style.overflow = "scroll");
    });



    const handleFileChange = (e) => {
        const files = (e.target).files

        if (files && files.length > 0) {
            setFile(files[0]);
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
        if(e.target === e.currentTarget) {
            hidePopUp(true)
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("submit");
            let signedUrl = await uploadImageToCloudflare(ctx.userName, e.target.pictureName.value, ctx.token);
            let response = await fetch(signedUrl, {
                    method: "PUT",
                    body: file,
                    headers: {
                        "Content-Type": file.type
                    }
                });
            if(response.status != 200) {
                // TODO need to delete picture in backend
                console.error("unable to upload picture");
                return new Response(response, 500);
            }
            else {
                console.log("added picture");
                return response;
            }
            console.log(response);

        } catch (error) {
            console.error("Error:", error);

        }
    };

    return (<div className={style.blurryBackground} onClick={onclick}>
        <div className={style.popup}>
            <div className="relative">
                <CancelButton onclick={hidePopUp}/>
            </div>
            <form className="flex flex-grow flex-col space-y-1 w-96 px-10 pt-10 pb-10 min-h-[25rem]" onSubmit={handleSubmit} method={method} encType="multipart/form-data">
                <h2 className="font-extrabold">Create DailyArt</h2>
                <label htmlFor="pictureName">Title</label>
                <BasicForumInput type="text" id="pictureName" name="pictureName" maxLength="15"/>
                {fileDataURL ? <Image src={fileDataURL} unoptimized width={1035} height={1228} className="mt-10"/> :
                    <div className="flex flex-grow bg-slate-100 hover:bg-slate-200">
                        <label htmlFor="file" className="flex-grow grid grid-cols-1 content-center text-center" name="file">
                            <Image src="/icons/palette-solid.svg" width={24} height={24} unoptimized/>
                            <p>Import File</p>
                            <div className="content-center text-center h-1">
                                <input id="file" type="file" onChange={handleFileChange} accept="image/*" hidden={false} name="file" className="opacity-0 h-1 w-1" required={true}/>
                            </div>
                        </label>
                    </div>}
                <SubmitButton text="Add Picture"/>
            </form>
        </div>
        </div>);
};

export {AddPictureInfo}