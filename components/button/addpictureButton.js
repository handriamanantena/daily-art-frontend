import {Fragment, useContext} from "react";
import AuthContext from "../../common/context/auth-context";


export const AddPictureButton = () => {

    const ctx = useContext(AuthContext);
    return (
        <Fragment>
        {ctx.isLoggedIn ? <button className="flex flex-col w-1/2 sm:w-3/10 lg:w-1/4 border-4 border-yellow-500 text-9xl justify-center items-center text-yellow-500 rounded-lg" title="Add Picture">+</button> :
            <Fragment></Fragment>}
        </Fragment>
    );
}