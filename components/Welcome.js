import Image from "next/image";
import ArtistCredentials from "./forum/ArtistCredentials";
import {useContext, useState, useEffect } from "react";
import LogInOptions from "./forum/LoginOptions";
import AuthContext from "../common/context/auth-context";
import axios from "axios";
import { useRouter } from 'next/router'
import ForumBackground from "./forum/ForumBackground";
import useLogin from "../common/hooks/useLogin";

export default function Welcome({welcomePage, welcomeTitle}) {

    const router = useRouter()

    const ctx = useContext(AuthContext);
    const [errMsg, setErrMsg] = useState('');
    const [emailMsg, setEmailMsg] = useState('');
    const login = useLogin();

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
        event.preventDefault();

        // Get data from the form.
        const data = {
            userName: event.target.userName.value,
            password: event.target.password.value,
        }

        // API endpoint where we send form data.
        const endpoint = process.env.NEXT_PUBLIC_PICTURES_API_HOST + process.env.NEXT_PUBLIC_PICTURES_API_PORT + "/artist/login";

        try {
            const response = await axios.post(endpoint,
                JSON.stringify(data),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            //console.log(JSON.stringify(response?.data));
            console.log("retrieved user", JSON.stringify(response));
            ctx.login(response.data);
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
        event.preventDefault();
        let email = event.target.email.value;
        let password = event.target.password.value;
        const host = process.env.NEXT_PUBLIC_PICTURES_API_HOST + process.env.NEXT_PUBLIC_PICTURES_API_PORT;
        let body = JSON.stringify({
            email,
            password
        })
        const response = await fetch(host + '/register', {
            method: 'POST',
            credentials: 'include', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
            },
            body: body
        });
        if(response.status === 200 || response.status === 201) {
            await login(await response.json(), true);
        }
        else if(response.status === 409) {
            setEmailMsg("Email in use");
        }
        else {
            return setErrMsg("Unable to login");
        }
    };

    let additionalProps = { // login
        artistInfoTitle: "Username",
        artistPasswordTitle: "Password",
        passwordFlavourText: "",
        onSubmit: handleLogin,
        passwordStrength: "",
        onKeyDown: onKeyDown,
        artistInfoInputType: 'text',
        welcomeTitle: welcomeTitle,
        errMsg : errMsg,
        emailMsg,
    }
    if(welcomePage == 'join') {
        additionalProps = {
            artistInfoTitle: "Add your email",
            artistPasswordTitle: "Choose a password",
            passwordFlavourText: "Min 6 characters, numbers & letters",
            onSubmit: handleJoin,
            passwordStrength: passwordStrength,
            onKeyDown: onKeyDown,
            artistInfoInputType: 'email',
            welcomeTitle: welcomeTitle,
            errMsg : errMsg,
            emailMsg
        }
    }
/*
        return (<ForumBackground>
                <ArtistCredentials {...additionalProps}/>
                <LogInOptions/>
        </ForumBackground>);*/

    return (<ForumBackground>
        <div className="grid grid-cols-1 w-96 px-10 pt-10">
            <h2 className="font-extrabold pb-5">{welcomeTitle}</h2>
            <LogInOptions/>
        </div>
    </ForumBackground>);
}
