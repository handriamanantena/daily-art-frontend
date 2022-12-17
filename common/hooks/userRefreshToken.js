import axios from "../api/AuthenticationAxios";
import {useContext} from "react";
import AuthContext from "../context/auth-context";

const useRefreshToken = () => {
    const ctx = useContext(AuthContext);

    const refresh = async () => {
        const response = await axios.get('/refresh', {
            withCredentials: true
        });
        ctx.login(response.data.accessToken)
        return response.data.accessToken;
    }
    return refresh;
};

export default useRefreshToken;