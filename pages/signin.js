import LogInOptions from "../components/forum/LoginOptions";
import Head from "next/head";
import GoogleButton from "../components/button/googleButton";
import Welcome from "../components/Welcome";

function Signin() {

    return (<div class="bg-gradient-to-r from-cyan-500 to-blue-500">
        <Head>
            <title>Sign In</title>
            <link rel="icon" href="/favicon.ico" />
            <script src="https://accounts.google.com/gsi/client" async defer></script>
        </Head>
        <div className="flex items-center h-screen justify-center align-middle">
            <Welcome welcomePage="login" welcomeTitle="Log In"></Welcome>
        </div>
    </div>);
}

export default Signin;