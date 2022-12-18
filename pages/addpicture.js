import {BasicLayout} from "../components/common/BasicLayout";
import Join from "./join";
import {useContext} from "react";
import AuthContext from "../common/context/auth-context";



const Addpicture = () => {

    const ctx = useContext(AuthContext);

    return (<BasicLayout>
        {ctx.isLoggedIn ? <h1>Add Picture</h1> : <h1>Not authorized, log in</h1>}
    </BasicLayout>);
}

export default Addpicture;