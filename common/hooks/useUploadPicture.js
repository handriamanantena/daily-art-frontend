import {uploadImageToCloudflare} from "../api/cloudflare/workers";
import {useContext, useState} from "react";
import AuthContext from "../context/auth-context";


export const useUploadPicture = () => {

    const ctx = useContext(AuthContext);

    const [file, setFile] = useState("");
    const [loadingMessage, setLoadingMessage] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorText, setErrorText] = useState(undefined);

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

    return [ handleSubmit, file, setFile, loadingMessage, setLoadingMessage, isLoading, setIsLoading, errorText, setErrorText ];
};

export default useUploadPicture;