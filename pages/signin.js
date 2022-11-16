import LogIn from "../components/forum/Login";
import LogInOptions from "../components/forum/LoginOptions";
import Head from "next/head";
import GoogleButton from "../components/button/googleButton";

function Signin() {

    return (<div class="bg-gradient-to-r from-cyan-500 to-blue-500">
        <Head>
            <title>Sign In</title>
            <link rel="icon" href="/favicon.ico" />
            <script src="https://accounts.google.com/gsi/client" async defer></script>
        </Head>
        <div class="flex items-center h-screen justify-center align-middle">
            <LogIn></LogIn>
        </div>
    </div>);
}

export default Signin;