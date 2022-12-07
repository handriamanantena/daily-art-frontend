import Image from "next/image";
import ArtistCredentials from "./forum/ArtistCredentials";
import {useState} from "react";
import LogInOptions from "./forum/LoginOptions";

export default function Welcome(props) {




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

        // Form the request for sending data to the server.
        const options = {
            // The method is POST because we are sending data.
            method: 'POST',
            // Tell the server we're sending JSON.
            headers: {
                'Content-Type': 'application/json',
            },
            // Body of the request is the JSON data we created above.
            body: JSONdata,
        }

        // Send the form data to our forms API on Vercel and get a response.
        const response = await fetch(endpoint, options)

        // Get the response data from server as JSON.
        // If server returns the name submitted, that means the form works.
        const result = await response.json()
        alert(`Is this your full name: ${result.data}`)
    }

    const handleJoin = (event) => {
        alert("worked")
    }
    let additonalProps = { // login
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
        additonalProps = {
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
            <ArtistCredentials {...additonalProps}></ArtistCredentials>
            <LogInOptions></LogInOptions>
            </div>);
}
