import Image from "next/image";
import ArtistCredentials from "./forum/ArtistCredentials";
import {useContext, useState} from "react";
import LogInOptions from "./forum/LoginOptions";
import AuthContext from "../common/context/auth-context";
import axios from "axios";

export default function Welcome(props) {


    const ctx = useContext(AuthContext);
    const [errMsg, setErrMsg] = useState('');

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

        // Send the data to the server in JSON format.
        const JSONdata = JSON.stringify(data)

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
            console.log(JSON.stringify(response?.data));
            const accessToken = response?.data?.accessToken;
            ctx.login(accessToken);
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }


        // Get the response data from server as JSON.
        // If server returns the name submitted, that means the form works.
        const result = await response.json()
        alert(`Is this your full name: ${result.data}`)
    }

    const handleJoin = (event) => {
        alert("worked")
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

        return (<div className="bg-white">
            <p>{errMsg}</p>
            <ArtistCredentials {...additionalProps}></ArtistCredentials>
            <LogInOptions></LogInOptions>
            </div>);
}
