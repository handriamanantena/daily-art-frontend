import {useEffect, useState, useContext} from "react";
import BasicForumInput from "../inputs/input";
import SubmitButton from "../inputs/SubmitButton";
import style from "../../../styles/AddPictureInfo.module.css";
import React from "react";
import {default as NextImage} from "next/future/image";
import {CancelButton} from "../../button/cancelButton";
import AuthContext from "../../../common/context/auth-context";
import {uploadImageToCloudflare} from "../../../common/api/cloudflare/workers";
import {useRouter} from "next/router";

const AddPictureInfo = ({hidePopUp}) => {

    const ctx = useContext(AuthContext);
    const [file, setFile] = useState("");
    const [fileDataURL, setFileDataURL] = useState("");
    const [imageDimensions, setImageDimensions] = useState({});
    const router = useRouter();


    useEffect(() => {
        if(!ctx.isLoggedIn) {
            router.push("/join");
        }
        document.body.style.overflow = "hidden";
        return () => (document.body.style.overflow = "scroll");
    });



    const handleFileChange = (e) => {
        const files = (e.target).files

        if (files && files.length > 0) {
            setFile(files[0]);
        }
    };


    useEffect(async () => {
        let fileReader, isCancel = false;
        if (file) {
            fileReader = new FileReader();
            fileReader.onload = (e) => {
                const { result } = e.target;
                if (result && !isCancel) {
                    setFileDataURL(result);
                    console.log(imageDimensions);
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

    useEffect(() => {
        const img = new Image(fileDataURL);
        img.onload = () => {
            let proportion = img.height;
            console.log(img.height);
            console.log(img.width);

            setImageDimensions({
                height: img.height,
                width: img.width
            });
            console.log(img.height);
        };
        img.src = fileDataURL;
        img.onerror = (err) => {
            console.log("img error");
            console.error(err);
        };
    }, [fileDataURL]);

    let onclick = (e) => {
        if(e.target === e.currentTarget) {
            hidePopUp();
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
                router.push("/dailyart");
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
            <form className="flex flex-grow flex-col space-y-1 w-96 px-10 pt-10 pb-10 min-h-[25rem]" onSubmit={handleSubmit} encType="multipart/form-data">
                <h2 className="font-extrabold">Create DailyArt</h2>
                <label htmlFor="pictureName">Title</label>
                <BasicForumInput type="text" id="pictureName" name="pictureName" maxLength="15"/>
                {fileDataURL ?
                    Object.keys(imageDimensions).length === 0 ? (<b>Processing Image...</b>) :
                        (
                                <NextImage src={fileDataURL} width={1035} height={1228} className="pt-1"/>
                        ) :
                    <div className="flex flex-grow bg-slate-100 hover:bg-slate-200">
                        <label htmlFor="file" className="flex-grow grid grid-cols-1 content-center text-center justify-center" name="file">
                            <div className="pl-[45%]">
                            <NextImage src="/icons/palette-solid.svg" width={24} height={24} unoptimized/>
                            </div>
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