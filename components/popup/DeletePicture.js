import {LoadingScreen} from "../loading/LoadingScreen";
import SubmitButton from "../forum/inputs/SubmitButton";
import {PopupForm} from "./PopupForm";
import React, {useState} from "react";
import useAxiosPrivate from "../../common/hooks/useAxiosPrivate";
import {ForumButton} from "../forum/inputs/ForumButton";

export const DeletePicture = ({picture, hidePopUp}) => {

    const axiosPrivate = useAxiosPrivate();
    const [isLoadingHidden, setIsLoadingHidden] = useState(true);

    let deletePicture = async () => {
        const host = process.env.NEXT_PUBLIC_PICTURES_API_HOST + process.env.NEXT_PUBLIC_PICTURES_API_PORT;
        try {
            const response = await axiosPrivate.delete(host + `/pictures/${picture._id}`,
                {
                    headers: {'Content-Type': 'application/json'},
                    withCredentials: true
                }
            );
            setIsLoadingHidden(false);
            if(response.status == 200) {
                setTimeout(async () => {
                    window.location.reload();
                }, +(process.env.NEXT_PUBLIC_REVALIDATE_SEC) * 1000);
            }
            else {
                // TODO open error window
                console.error("error deleting picture");
                setTimeout(async () => {
                    window.location.reload();
                }, +(process.env.NEXT_PUBLIC_REVALIDATE_SEC) * 1000);
            }
            console.log(JSON.stringify(response?.data));
        } catch (err) {
            console.log(err);
        }

    };

    let cancel = async (e) => {
        hidePopUp();
        e.preventDefault();
    };

    return <PopupForm onSubmit={deletePicture}>
        <LoadingScreen isLoadingHidden={isLoadingHidden}>
            <p className="text-black">Loading...</p>
        </LoadingScreen>
        <h3>Are you sure you want&apos;t to delete this picture?</h3>
        <div className="flex space-x-1">
            <SubmitButton text="Yes"/>
            <ForumButton text="No" onClick={cancel} title="No"/>
        </div>
    </PopupForm>
}