import Image from "next/image";
import ArtistCredentials from "./forum/ArtistCredentials";
import {useState} from "react";
import LogInOptions from "./forum/LoginOptions";

export default function Welcome(props) {




    let [passwordContent, setPasswordStrength] = useState(1);

    let onKeyDown = (event) => {
        setPasswordStrength(passwordContent + 1);
        console.log(passwordContent);
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
        passwordContent: "",
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
            passwordContent: passwordContent,
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
