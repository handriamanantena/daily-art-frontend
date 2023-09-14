import {uploadImageToCloudflare} from "../api/cloudflare/workers";
import {useContext, useState} from "react";
import AuthContext from "../context/auth-context";
import {useRouter} from "next/router";
import {createPicturePath} from "../api/pictures";


export const useUploadPicture = () => {

    const ctx = useContext(AuthContext);
    const router = useRouter();
    const [file, setFile] = useState("");
    const [loadingMessage, setLoadingMessage] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorText, setErrorText] = useState(undefined);

    const handleSubmit = async (pictureName, dailyChallenge) => {
        console.log("submit");
        try {
            console.log("submit");
            setIsLoading(true);
            setLoadingMessage("Uploading...");
            let signedUrl = await uploadImageToCloudflare(ctx.userName, pictureName, dailyChallenge, ctx.token);
            setLoadingMessage("Saving Data...");
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
                return false;
            }
            else {
                let urlSplit = signedUrl.split("/");
                let pictureId = urlSplit[urlSplit.length-1].split("?")[0];
                console.log("added picture");
                setLoadingMessage("Finishing up...");
                let picturePath = createPicturePath({ pictureName: pictureName, _id : pictureId});
                await router.push(`/picture/${picturePath}`);
                return true;
            }
            console.log(response);
        } catch (error) {
            setIsLoading(false);
            setErrorText("Unable to upload");
            console.error("Error:", error);
            return false;
        }
    };

    return [ handleSubmit, file, setFile, loadingMessage, setLoadingMessage, isLoading, setIsLoading, errorText, setErrorText ];
};

export default useUploadPicture;