import Image from "next/image";
import ArtistCredentials from "./forum/ArtistCredentials";
import {useContext, useState, useEffect } from "react";
import LogInOptions from "./forum/LoginOptions";
import AuthContext from "../common/context/auth-context";
import axios from "axios";
import {register} from "../common/Login";
import { useRouter } from 'next/router'
import ForumBackground from "./forum/ForumBackground";

export default function Welcome(props) {

    const router = useRouter()

    const ctx = useContext(AuthContext);
    const [errMsg, setErrMsg] = useState('');

    useEffect(async () => {
        // Prefetch the dashboard page
        await router.prefetch('/dailyart')
    }, []);

    let [passwordStrength, setPasswordStrength] = useState("");
    let onKeyDown = (event) => {
        let passwordContent = event.target.value
        if(passwordContent.trim() == 0 ||  passwordContent.length <= 5) {
            setPasswordStrength("WEAK");
        }
        else if(passwordContent.length <=7) {
            setPasswordStrength("LOW");
        }
        // at least 1 number, 1 lower case, 1 capital and 1 special character
        else if(passwordContent.length >= 8 &&
            passwordContent.match("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%&]).*$") != null) {
            setPasswordStrength("GOOD");
        }

    }

    const handleLogin = async (event) => {
        // Stop the form from submitting and refreshing the page.
        event.preventDefault()

        // Get data from the form.
        const data = {
            userName: event.target.userName.value,
            password: event.target.password.value,
        }

        // API endpoint where we send form data.
        const endpoint = process.env.REACT_APP_PICTURES_API_HOST + process.env.REACT_APP_PICTURES_API_PORT + "/artist";

        try {
            const response = await axios.post(endpoint,
                JSON.stringify(data),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            //console.log(JSON.stringify(response?.data));
            console.log("retrieved user", response);
            const accessToken = response.credential;
            ctx.login(accessToken);
            await router.push("/dailyart");
        } catch (err) {
            if (err?.response) {
                console.log(err);
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
        }
    }

    const handleJoin = async (event) => {
        event.preventDefault()
        let response = await register(event.target.email.value, event.target.password.value);
        console.log("success register ", response.ok);
        if(response.ok) {
            await router.push("/username");
        }
        else if(response.status == 409) {
            setErrMsg("Email Already in Use");
        }

    }
    let additionalProps = { // login
        artistInfoTitle: "Username",
        artistPasswordTitle: "Password",
        passwordFlavourText: "",
        onSubmit: handleLogin,
        passwordStrength: "",
        onKeyDown: onKeyDown,
        artistInfoInputType: 'text',
        welcomeTitle: props.welcomeTitle
    }
    if(props.welcomePage == 'join') {
        additionalProps = {
            artistInfoTitle: "Add your email",
            artistPasswordTitle: "Choose a password",
            passwordFlavourText: "Min 6 characters, numbers & letters",
            onSubmit: handleJoin,
            passwordStrength: passwordStrength,
            onKeyDown: onKeyDown,
            artistInfoInputType: 'email',
            welcomeTitle: props.welcomeTitle
        }
    }

        return (<ForumBackground>
                <p>{errMsg}</p>
                <ArtistCredentials {...additionalProps}/>
                <LogInOptions/>
            </ForumBackground>);
}
