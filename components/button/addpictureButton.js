import {Fragment, useContext} from "react";
import AuthContext from "../../common/context/auth-context";
import { useState } from 'react';


export const AddPictureButton = () => {

    const ctx = useContext(AuthContext);
    const [file, setFile] = useState();

    const handleFileChange = (e) => {
        if (e.target.files) {
            setFile(e.target.files[0].type);
            console.log(JSON.stringify(e.target.files));
        }
    };
    return (
        <Fragment>
        {ctx.isLoggedIn ?
            <Fragment>
                <input id="uploadSound" type="file" onChange={handleFileChange} hidden={true}/>
                <label className="flex flex-col w-1/2 sm:w-3/10 lg:w-1/4 border-4 border-yellow-500 text-9xl justify-center items-center text-yellow-500 rounded-lg" htmlFor="uploadSound" >
                    +
                </label>
                <div>{JSON.stringify(file)}</div>
            </Fragment> :
            <Fragment></Fragment>}
        </Fragment>
    );
}