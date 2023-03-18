import { axiosPrivate } from "../api/AuthenticationAxios"
import {useContext, useEffect} from "react";
import AuthContext from "../context/auth-context";
import useRefreshToken from "./userRefreshToken";

const useAxiosPrivate = () => {
    const ctx = useContext(AuthContext);
    const refresh = useRefreshToken();

    useEffect(() => {

        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${ctx.token}`;
                }
                return config;
            }, (error) => Promise.reject(error)
        );

        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config; // config object from axios
                if (error?.response?.status === 403 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return axiosPrivate(prevRequest); // update config with prevRequest.sent
                }
                return Promise.reject(error); // not able to authorize
            }
        );

        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        }
    }, [ctx.token, refresh])

    return axiosPrivate;
}

export default useAxiosPrivate;