import axios from "../api/AuthenticationAxios";
import {useContext} from "react";
import AuthContext from "../context/auth-context";

const useRefreshToken = () => {
    const ctx = useContext(AuthContext);

    const refresh = async () => {
        const response = await axios.get('/refresh', {
            withCredentials: true
        });
        console.log("edit response" + JSON.stringify(response));
        ctx.login(response.data)
        return response.data.accessToken;
    }
    return refresh;
};

export default useRefreshToken;