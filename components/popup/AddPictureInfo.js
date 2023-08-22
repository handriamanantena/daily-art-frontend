import {useEffect, useState, useContext} from "react";
import BasicForumInput from "../forum/inputs/input";
import SubmitButton from "../forum/inputs/SubmitButton";
import style from "../../styles/AddPictureInfo.module.css";
import React from "react";
import {default as NextImage} from "next/future/image";
import {CancelButton} from "../button/cancelButton";
import AuthContext from "../../common/context/auth-context";
import {uploadImageToCloudflare} from "../../common/api/cloudflare/workers";
import {useRouter} from "next/router";
import Loading from "../loading/Loading";
import Label from "../forum/inputs/label";

const AddPictureInfo = () => {

    const ctx = useContext(AuthContext);
    const [file, setFile] = useState("");
    const [fileDataURL, setFileDataURL] = useState("");
    const [imageDimensions, setImageDimensions] = useState({});
    const [loadingMessage, setLoadingMessage] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorText, setErrorText] = useState(undefined);
    const router = useRouter();


    useEffect(() => {
        if(!ctx.isLoggedIn) {
            router.push("/join");
        }
        document.body.style.overflow = "hidden";
        return () => (document.body.style.overflow = "scroll");
    });



    const handleFileChange = (e) => {
        console.log(e);
        const files = (e.target).files

        if (files && files.length > 0) {
            if(files[0].size <= process.env.NEXT_PUBLIC_MAX_FILE_UPLOAD_BYTE_SIZE) {
                setErrorText(undefined);
                setFile(files[0]);
            }
            else {
                setErrorText("File too large");
            }
            console.log("file size: " +  files[0].size);
        }
    };


    useEffect(async () => {
        let fileReader, isCancel = false;
        if (file) {
            fileReader = new FileReader();
            fileReader.onload = (e) => {
                const { result } = e.target;
                if (result && !isCancel) {
                    console.log("inside");
                    setFileDataURL(result);
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
        console.log("dimensions");


        const img = new Image(fileDataURL);
        img.onload = () => {

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

    const handleSubmit = async (e) => {
        console.log("submit");
        e.preventDefault();
        try {
            console.log("submit");
            setIsLoading(true);
            setLoadingMessage("Uploading...");
            let signedUrl = await uploadImageToCloudflare(ctx.userName, e.target.pictureName?.value, ctx.token);
            console.log(signedUrl);
            let response = await fetch(signedUrl, {
                    method: "PUT",
                    body: file,
                    headers: {
                        "Content-Type": file.type
                    }
                });
            console.log("second call")
            if(response.status != 200 && response.status != 201) {
                setIsLoading(false);
                // TODO need to delete picture in backend and send error message to front end
                setErrorText("Unable to upload");
                console.error("unable to upload picture");
            }
            else {
                console.log("added picture");
                setTimeout(() => {
                    setLoadingMessage("Success");
                    setIsLoading(false);
                    window.location.reload();
                }, +(process.env.NEXT_PUBLIC_REVALIDATE_SEC) * 1000);
            }
            console.log(response);
        } catch (error) {
            setIsLoading(false);
            setErrorText("Unable to upload");
            console.error("Error:", error);
        }
    };

    return (
            <form className="flex flex-grow flex-col space-y-1 md:min-w-[24rem] px-10 pt-10 pb-10 min-h-[25rem] max-h-screen max-w-fit md:max-w-none" onSubmit={handleSubmit} encType="multipart/form-data">
                <h2 className="font-extrabold">Upload Drawing</h2>
                <input type="radio" id="dailyChallenge" name="dailyChallenge" value="Test"/>
                <label htmlFor="dailyChallenge">Yes</label>
                <label htmlFor="pictureName">Title</label>
                <BasicForumInput type="text" id="pictureName" name="pictureName" maxLength="15"/>
                {fileDataURL && errorText == undefined ?
                    Object.keys(imageDimensions).length === 0 ? (<b>Processing Image...</b>) :
                        (
                            <div className="content-center text-center justify-center md:min-h-[250px]">
                                <div className={isLoading ? "brightness-50 bg-slate-100 md:bg-inherit" : "bg-slate-100 md:bg-inherit"}>
                                    <NextImage data-testid="preview-picture" src={fileDataURL} width={1035}
                                               height={1228} className="pt-1 max-h-[250px] md:max-h-[500px] max-w-max inline" alt="Image"/>
                                </div>
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" hidden={!isLoading}>
                                    <Loading>
                                        <p data-testid="uploading" className="text-white">{loadingMessage}</p>
                                    </Loading>
                                </div>
                            </div>
                        ) :
                    <div className="flex flex-grow bg-slate-100 hover:bg-slate-200">
                        <label htmlFor="file" className="flex-grow grid grid-cols-1 content-center text-center justify-center" name="file">
                            <div className="pl-[45%]">
                            <NextImage src="/icons/palette-solid.svg" width={24} height={24} unoptimized alt="Image"/>
                            </div>
                            <p>Import File</p>
                            {errorText ? <p data-testid="file-message" className="text-red-500">{errorText}</p> : <></>}
                            <div className="content-center text-center h-1">
                                <input data-testid="file-input" id="file" type="file" onChange={handleFileChange} accept="image/*" hidden={false} name="file" className="opacity-0 h-1 w-1" required={true}/>
                            </div>
                        </label>
                    </div>}
                <SubmitButton text="Submit"/>
            </form>);
};

export {AddPictureInfo}