import {default as NextImage} from "next/future/image";
import Loading from "../loading/Loading";
import React, {useEffect, useState} from "react";

export const ImageInput = ({file, setFile, loadingMessage, setLoadingMessage, isLoading, setIsLoading, errorText, setErrorText}) => {

    const [fileDataURL, setFileDataURL] = useState("");
    const [imageDimensions, setImageDimensions] = useState({});

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

    return fileDataURL && errorText == undefined ?
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
        <div className="flex flex-grow bg-slate-100 hover:bg-slate-200 h-auto md:min-h-[174px]">
            <label htmlFor="file" className="flex-grow grid grid-cols-1 content-center text-center justify-center" name="file">
                <div className="pl-[45%]">
                    <NextImage src="/icons/palette-solid.svg" width={24} height={24} unoptimized alt="Image"/>
                </div>
                <p>Import Drawing</p>
                {errorText ? <p data-testid="file-message" className="text-red-500">{errorText}</p> : <></>}
                <div className="content-center text-center h-1">
                    <input data-testid="file-input" id="file" type="file" onChange={handleFileChange} accept="image/*" hidden={false} name="file" className="opacity-0 h-1 w-1" required={true}/>
                </div>
            </label>
        </div>
}