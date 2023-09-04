import AuthContext from "../context/auth-context";
import {useContext} from "react";
import { useRouter } from 'next/router'

const useLogin = () => {

    let ctx = useContext(AuthContext);
    let router = useRouter();

    let login = async (loginResponse) => {
        ctx.login(loginResponse);
        console.log("jwt from backend " + JSON.stringify(loginResponse));
        if(loginResponse.artist?.userName) {
            await router.push("/dailyart");
        }
        else {
            await router.push("/username");
        }
    }

    return login;
}

export default useLogin;
