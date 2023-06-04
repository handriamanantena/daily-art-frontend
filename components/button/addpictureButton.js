import {Fragment, useContext, useRef, useState} from "react";
import AuthContext from "../../common/context/auth-context";
import jwt_decode from "jwt-decode";


export const AddPictureButton = ({}) => {
    const host = process.env.REACT_APP_PICTURES_API_HOST + process.env.REACT_APP_PICTURES_API_PORT

    const ctx = useContext(AuthContext);
    const [file, setFile] = useState("");
    let decoded;

    const handleFileChange = (e) => {
        const files = (e.target).files

        if (files && files.length > 0) {
            setFile(files[0])
        }
    };

    if(ctx.token) {
        decoded = jwt_decode(ctx.token, {alg :"HS256"});
    }

    const handleSubmit = async () => {
        try {
            let data = new FormData()
            data.append('file', file, file.name);
            data.append('picture', JSON.stringify({
                pictureName: "Madara",
                url: "madara.jpg",
                tags: [
                    "anime",
                    "naruto"
                ],
            }));
            console.log("decode: " + JSON.stringify(ctx.token));
            const response = await fetch(host + "/pictures/" + decoded.username, {
                method: "POST",
                credentials: 'include', // include, *same-origin, omit
                headers: {
                    'Authorization': 'Bearer ' + ctx.token
                },
                body: data,
            });
            const result = await response.json();
            console.log("Success:", result);
        } catch (error) {
            console.error("Error:", error);
        }
    };
    return (
        <Fragment>
        {ctx.isLoggedIn ?
            <Fragment>
                <form onSubmit={handleSubmit} method="post" encType="multipart/form-data">
                    <input id="file" type="file" onChange={handleFileChange} hidden={true}/>
                    <label
                        className="flex flex-col w-1/2 sm:w-3/10 lg:w-1/4 border-4 border-yellow-500 text-9xl justify-center items-center text-yellow-500 rounded-lg"
                        htmlFor="file">
                        +
                    </label>
                    <button type="submit">Submit</button>
                </form>
            </Fragment> : <Fragment></Fragment>}
        </Fragment>
    );
}