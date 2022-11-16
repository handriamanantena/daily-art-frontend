import GoogleButton from "../button/googleButton";


export default function LogIn() {

    const handleSubmit = async (event) => {
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

    return (
        <div class="flex-col bg-cyan-500 shadow-lg shadow-cyan-500/50">
            <h2>Log In</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 place-content-cente">
                <label htmlFor="userName">User Name</label>
                <input type="text" id="userName" name="userName" required/>

                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" required/>

                <button type="submit">Log In</button>
            </form>
            <div>
                <GoogleButton></GoogleButton>
            </div>
        </div>
    );
}